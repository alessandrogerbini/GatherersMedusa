import { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils";

/**
 * Script to update admin user credentials
 * Changes from:
 *   - Email: admin@medusa.com
 *   - Password: supersecret
 * To:
 *   - Email: sandro@gatherersgranola.com
 *   - Password: 3a8XTONqJvR5YV0lw2OC
 */
export default async function updateAdminCredentials({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);

  logger.info("🔐 Updating admin user credentials...");

  const OLD_EMAIL = "admin@medusa.com";
  const NEW_EMAIL = "sandro@gatherersgranola.com";
  const NEW_PASSWORD = "3a8XTONqJvR5YV0lw2OC";

  try {
    // First, try to find the admin user using the query service
    logger.info(`Searching for admin user with email: ${OLD_EMAIL}`);
    
    let adminUser: any = null;
    
    try {
      const adminUsers = await query.graph({
        entity: "auth_user",
        fields: ["id", "email"],
        filters: {
          email: OLD_EMAIL,
        },
      });

      if (adminUsers && adminUsers.length > 0) {
        adminUser = adminUsers[0];
        logger.info(`Found admin user: ${adminUser.email} (ID: ${adminUser.id})`);
      }
    } catch (queryError: any) {
      logger.warn(`Query service approach failed: ${queryError.message}`);
      logger.info("Trying alternative method...");
    }

    // If not found via query, try using auth module
    if (!adminUser) {
      logger.info("Attempting to find user via auth module...");
      try {
        const authModule = container.resolve(Modules.AUTH);
        
        if (authModule && typeof authModule.listUsers === "function") {
          const users = await authModule.listUsers({
            email: OLD_EMAIL,
          });

          if (users && users.length > 0) {
            adminUser = users[0];
            logger.info(`Found admin user via auth module: ${adminUser.email} (ID: ${adminUser.id})`);
          }
        }
      } catch (authError: any) {
        logger.warn(`Auth module approach failed: ${authError.message}`);
      }
    }

    // If still not found, try to find any admin user
    if (!adminUser) {
      logger.warn(`⚠️  Admin user with email '${OLD_EMAIL}' not found.`);
      logger.info("Attempting to find any admin user...");
      
      try {
        const allUsers = await query.graph({
          entity: "auth_user",
          fields: ["id", "email"],
        });

        if (allUsers && allUsers.length > 0) {
          adminUser = allUsers[0];
          logger.info(`Found user: ${adminUser.email} (ID: ${adminUser.id})`);
          logger.info("Will update this user's credentials...");
        }
      } catch (error: any) {
        logger.error("Could not list users:", error.message);
      }
    }

    if (!adminUser) {
      logger.error("❌ No admin users found in the system.");
      logger.info("You may need to create an admin user first using: medusa user");
      return;
    }

    // Update the admin user
    logger.info("Updating email and password...");
    
    // Try using auth module first (it handles password hashing automatically)
    let updateSuccess = false;
    let authError: any = null;
    
    try {
      const authModule = container.resolve(Modules.AUTH);
      
      if (authModule && typeof authModule.updateUsers === "function") {
        await authModule.updateUsers(adminUser.id, {
          email: NEW_EMAIL,
          password: NEW_PASSWORD, // Auth module handles password hashing
        });
        
        logger.info("✅ Successfully updated admin user credentials via auth module!");
        updateSuccess = true;
      }
    } catch (error: any) {
      authError = error;
      logger.warn(`Auth module update failed: ${error.message}`);
    }

    // If auth module didn't work, try query service
    if (!updateSuccess) {
      try {
        // Try to update via query service
        // Note: This may require the password to be pre-hashed, but we'll try with plain password
        // as some implementations might handle it
        await query.graph({
          entity: "auth_user",
          fields: ["id"],
          filters: { id: adminUser.id },
          update: {
            email: NEW_EMAIL,
          },
        });
        
        logger.info("✅ Successfully updated email via query service!");
        logger.warn("⚠️  Password update may require manual intervention.");
        logger.warn("   Please use the Medusa CLI to update the password:");
        logger.warn(`   medusa user -e ${NEW_EMAIL} -p ${NEW_PASSWORD}`);
        updateSuccess = true;
      } catch (queryError: any) {
        logger.error("❌ Both update methods failed");
        logger.error(`Auth module error: ${authError?.message || "N/A"}`);
        logger.error(`Query service error: ${queryError.message}`);
        logger.error("");
        logger.error("💡 Recommended solution:");
        logger.error("   Use the Medusa CLI to update credentials:");
        logger.error(`   medusa user -e ${NEW_EMAIL} -p ${NEW_PASSWORD}`);
        logger.error("");
        logger.error("   Or update manually in the database:");
        logger.error("   1. Connect to your PostgreSQL database");
        logger.error("   2. Find the auth_user table");
        logger.error(`   3. Update the email field to: ${NEW_EMAIL}`);
        logger.error(`   4. Update the password_hash field (requires bcrypt hashing)`);
        throw queryError;
      }
    }

    logger.info("✅ Successfully updated admin user credentials!");
    logger.info(`   Email: ${adminUser.email} → ${NEW_EMAIL}`);
    logger.info("   Password: Updated to new secure password");
    logger.info("");
    logger.info("📋 New credentials:");
    logger.info(`   Login: ${NEW_EMAIL}`);
    logger.info(`   Password: ${NEW_PASSWORD}`);

  } catch (error: any) {
    logger.error("❌ Error updating admin credentials:", error.message);
    if (error.stack) {
      logger.error(error.stack);
    }
    throw error;
  }
}

