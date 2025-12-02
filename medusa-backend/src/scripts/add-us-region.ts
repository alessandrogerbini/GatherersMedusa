import { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils";
import {
  createRegionsWorkflow,
  createTaxRegionsWorkflow,
} from "@medusajs/medusa/core-flows";

export default async function addUSRegion({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const regionModuleService = container.resolve(Modules.REGION);

  logger.info("Adding US region with USD currency...");

  // Check if US region already exists
  const existingRegions = await regionModuleService.listRegions({
    currency_code: "usd",
  });

  if (existingRegions.length) {
    logger.info("US region already exists!");
    return;
  }

  // Create US region
  const { result: regionResult } = await createRegionsWorkflow(container).run({
    input: {
      regions: [
        {
          name: "United States",
          currency_code: "usd",
          countries: ["us"],
          payment_providers: ["pp_system_default"],
        },
      ],
    },
  });

  logger.info(`Created US region: ${regionResult[0].id}`);

  // Create tax region for US
  await createTaxRegionsWorkflow(container).run({
    input: [
      {
        country_code: "us",
        provider_id: "tp_system",
      },
    ],
  });

  logger.info("Created US tax region");
  logger.info("US region setup complete! Access the store at /us/store");
}

