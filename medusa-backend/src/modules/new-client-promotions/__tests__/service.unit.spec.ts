import NewClientPromotionsService from "../service"
import { Modules } from "@medusajs/framework/utils"

describe("NewClientPromotionsService", () => {
  let service: NewClientPromotionsService
  let mockContainer: any
  let mockPromotionService: any
  let mockNotificationService: any

  beforeEach(() => {
    // Mock promotion service
    mockPromotionService = {
      createPromotions: jest.fn().mockResolvedValue([
        {
          id: "promo_123",
          code: "WELCOME5-TEST-123456",
          type: "standard",
        },
      ]),
    }

    // Mock notification service
    mockNotificationService = {
      sendEmail: jest.fn().mockResolvedValue({
        id: "email_123",
        status: "sent",
      }),
    }

    // Mock container
    mockContainer = {
      resolve: jest.fn((key: string) => {
        if (key === Modules.PROMOTION) {
          return mockPromotionService
        }
        if (key === "notificationModuleService") {
          return mockNotificationService
        }
        return null
      }),
    }

    // Create service instance
    service = new NewClientPromotionsService(mockContainer)
  })

  describe("createWelcomePromotion", () => {
    it("should create a promotion with correct format", async () => {
      const customerId = "cust_123"
      const customerEmail = "test@example.com"

      const code = await service.createWelcomePromotion(customerId, customerEmail)

      expect(code).toMatch(/^WELCOME5-[A-Z0-9]{1,8}-\d{6}$/)
      expect(mockPromotionService.createPromotions).toHaveBeenCalledWith([
        expect.objectContaining({
          code: expect.stringMatching(/^WELCOME5-[A-Z0-9]{1,8}-\d{6}$/),
          type: "standard",
          application_method: {
            type: "percentage",
            target_type: "order",
            value: 5,
            currency_code: "usd",
          },
        }),
      ])
    })

    it("should generate unique codes for different customers", async () => {
      const code1 = await service.createWelcomePromotion(
        "cust_1",
        "john@example.com"
      )
      const code2 = await service.createWelcomePromotion(
        "cust_2",
        "jane@example.com"
      )

      expect(code1).not.toBe(code2)
    })

    it("should handle long email prefixes correctly", async () => {
      const code = await service.createWelcomePromotion(
        "cust_123",
        "verylongemailaddress@example.com"
      )

      // Should truncate to 8 characters
      expect(code).toMatch(/^WELCOME5-[A-Z0-9]{1,8}-\d{6}$/)
    })

    it("should throw error if promotion creation fails", async () => {
      mockPromotionService.createPromotions.mockRejectedValue(
        new Error("Promotion creation failed")
      )

      await expect(
        service.createWelcomePromotion("cust_123", "test@example.com")
      ).rejects.toThrow("Failed to create welcome promotion")
    })
  })

  describe("sendWelcomeEmail", () => {
    it("should send email with correct parameters", async () => {
      const customerEmail = "test@example.com"
      const customerFirstName = "John"
      const promotionCode = "WELCOME5-TEST-123456"

      await service.sendWelcomeEmail(customerEmail, customerFirstName, promotionCode)

      expect(mockNotificationService.sendEmail).toHaveBeenCalledWith({
        to: customerEmail,
        from: expect.any(String),
        subject: "Welcome to Gatherer's Granola - Your 5% Off Code Inside!",
        html: expect.stringContaining(promotionCode),
        type: "welcome_promotion",
        metadata: {
          customer_email: customerEmail,
          promotion_code: promotionCode,
        },
      })
    })

    it("should include customer first name in email", async () => {
      const customerEmail = "test@example.com"
      const customerFirstName = "John"
      const promotionCode = "WELCOME5-TEST-123456"

      await service.sendWelcomeEmail(customerEmail, customerFirstName, promotionCode)

      const emailCall = mockNotificationService.sendEmail.mock.calls[0][0]
      expect(emailCall.html).toContain("Hi John")
    })

    it("should use fallback greeting when first name is null", async () => {
      const customerEmail = "test@example.com"
      const promotionCode = "WELCOME5-TEST-123456"

      await service.sendWelcomeEmail(customerEmail, null, promotionCode)

      const emailCall = mockNotificationService.sendEmail.mock.calls[0][0]
      expect(emailCall.html).toContain("Hi there")
    })

    it("should include promotion code in email HTML", async () => {
      const customerEmail = "test@example.com"
      const promotionCode = "WELCOME5-TEST-123456"

      await service.sendWelcomeEmail(customerEmail, "John", promotionCode)

      const emailCall = mockNotificationService.sendEmail.mock.calls[0][0]
      expect(emailCall.html).toContain(promotionCode)
      expect(emailCall.html).toContain("5% off")
    })

    it("should throw error if email sending fails", async () => {
      mockNotificationService.sendEmail.mockRejectedValue(
        new Error("Email sending failed")
      )

      await expect(
        service.sendWelcomeEmail("test@example.com", "John", "WELCOME5-TEST-123456")
      ).rejects.toThrow("Email sending failed")
    })
  })
})










