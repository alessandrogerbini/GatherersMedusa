import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Table, Badge, Button, Text } from "@medusajs/ui"
import { useState, useEffect } from "react"

const WholesaleApplicationsWidget = () => {
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/admin/wholesale", {
        credentials: "include",
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || "Failed to fetch applications")
      }

      const data = await response.json()
      setApplications(data.applications || [])
    } catch (err: any) {
      console.error("Error fetching wholesale applications:", err)
      setError(err.message)
      // Set empty array on error so the widget doesn't break the page
      setApplications([])
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (customerId: string) => {
    try {
      const response = await fetch(`/admin/wholesale/${customerId}/approve`, {
        method: "POST",
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to approve application")
      }

      // Refresh applications
      await fetchApplications()
    } catch (err: any) {
      alert(`Error: ${err.message}`)
    }
  }

  const handleReject = async (customerId: string) => {
    const reason = prompt("Reason for rejection (optional):")
    
    try {
      const response = await fetch(`/admin/wholesale/${customerId}/reject`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reason }),
      })

      if (!response.ok) {
        throw new Error("Failed to reject application")
      }

      // Refresh applications
      await fetchApplications()
    } catch (err: any) {
      alert(`Error: ${err.message}`)
    }
  }

  if (loading) {
    return (
      <Container>
        <Heading level="h2">Wholesale Applications</Heading>
        <Text>Loading applications...</Text>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <Heading level="h2">Wholesale Applications</Heading>
        <Text className="text-red-500">Error: {error}</Text>
      </Container>
    )
  }

  return (
    <Container>
      <div className="flex items-center justify-between mb-4">
        <Heading level="h2">Wholesale Applications</Heading>
        <Badge size="small" color="blue">
          {applications.length} Pending
        </Badge>
      </div>

      {applications.length === 0 ? (
        <Text>No pending wholesale applications.</Text>
      ) : (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Customer</Table.HeaderCell>
              <Table.HeaderCell>Business Name</Table.HeaderCell>
              <Table.HeaderCell>Business Type</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell>Applied Date</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {applications.map((app) => (
              <Table.Row key={app.id}>
                <Table.Cell>
                  <div>
                    <Text weight="plus">{app.first_name} {app.last_name}</Text>
                    <Text size="small" className="text-gray-500">{app.email}</Text>
                  </div>
                </Table.Cell>
                <Table.Cell>{app.wholesale_application?.business_name}</Table.Cell>
                <Table.Cell>{app.wholesale_application?.business_type}</Table.Cell>
                <Table.Cell>{app.wholesale_application?.phone}</Table.Cell>
                <Table.Cell>
                  {app.wholesale_application?.applied_at
                    ? new Date(app.wholesale_application.applied_at).toLocaleDateString()
                    : "N/A"}
                </Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2">
                    <Button
                      size="small"
                      variant="primary"
                      onClick={() => handleApprove(app.id)}
                    >
                      Approve
                    </Button>
                    <Button
                      size="small"
                      variant="danger"
                      onClick={() => handleReject(app.id)}
                    >
                      Reject
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "customer.list.before",
})

export default WholesaleApplicationsWidget

