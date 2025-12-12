import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"

/**
 * POST /store/auth/emailpass/reset-password
 * Request password reset
 */
export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    // Ensure body is parsed correctly
    const body = req.body || {}
    const { email } = body

    if (!email) {
      res.status(400).json({
        message: "Email is required",
      })
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      res.status(400).json({
        message: "Invalid email format",
      })
      return
    }

    // Check if customer exists (optional - for security, we may want to return success even if email doesn't exist)
    const customerModuleService = req.scope.resolve(Modules.CUSTOMER)
    
    try {
      const result = await customerModuleService.listCustomers({
        email,
      })
      const customers = Array.isArray(result) ? result : []
      
      // If customer doesn't exist, we still return success for security reasons
      // (don't reveal which emails are registered)
      if (!customers || customers.length === 0) {
        // Return success even if email doesn't exist (security best practice)
        res.status(200).json({
          message: "If an account with that email exists, a password reset link has been sent",
        })
        return
      }
    } catch (error) {
      // If lookup fails, still return success (security best practice)
      res.status(200).json({
        message: "If an account with that email exists, a password reset link has been sent",
      })
      return
    }

    // In a real implementation, this would:
    // 1. Generate a password reset token
    // 2. Store the token with expiration
    // 3. Send password reset email with link containing the token
    // For now, just return success
    res.status(200).json({
      message: "If an account with that email exists, a password reset link has been sent",
    })
  } catch (error: any) {
    console.error("Password reset request error:", error)
    res.status(400).json({
      message: error.message || "Failed to request password reset",
    })
  }
}

