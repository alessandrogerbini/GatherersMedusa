import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Label, Textarea } from "@medusajs/ui"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

/**
 * Rich Text Product Description Editor Widget
 * 
 * This widget replaces the standard description field with a rich text editor.
 * It appears on the product details page below the basic information.
 */
const ProductDescriptionEditor = () => {
  const { id } = useParams()
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (id) {
      fetchProduct()
    }
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/admin/products/${id}`, {
        credentials: "include",
      })
      const data = await response.json()
      setDescription(data.product?.description || "")
    } catch (error) {
      console.error("Error fetching product:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetch(`/admin/products/${id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
        }),
      })
      alert("Description updated successfully!")
    } catch (error) {
      console.error("Error updating product:", error)
      alert("Failed to update description")
    } finally {
      setSaving(false)
    }
  }

  // Formatting functions
  const insertFormatting = (before: string, after: string = "") => {
    const textarea = document.getElementById("rich-description") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = description.substring(start, end)
    const newText =
      description.substring(0, start) +
      before +
      selectedText +
      after +
      description.substring(end)

    setDescription(newText)

    // Reset cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      )
    }, 0)
  }

  if (loading) {
    return (
      <Container>
        <Heading level="h2">Product Description</Heading>
        <p>Loading...</p>
      </Container>
    )
  }

  return (
    <Container>
      <div className="mb-4">
        <Heading level="h2" className="mb-2">
          Rich Text Product Description
        </Heading>
        <p className="text-sm text-gray-600">
          Use the formatting buttons below to add rich text to your product description.
        </p>
      </div>

      {/* Formatting Toolbar */}
      <div className="mb-3 flex flex-wrap gap-2 p-3 bg-gray-50 rounded-md border">
        <button
          onClick={() => insertFormatting("**", "**")}
          className="px-3 py-1 bg-white border rounded hover:bg-gray-100 font-bold"
          title="Bold"
          type="button"
        >
          B
        </button>
        <button
          onClick={() => insertFormatting("*", "*")}
          className="px-3 py-1 bg-white border rounded hover:bg-gray-100 italic"
          title="Italic"
          type="button"
        >
          I
        </button>
        <button
          onClick={() => insertFormatting("### ")}
          className="px-3 py-1 bg-white border rounded hover:bg-gray-100"
          title="Heading"
          type="button"
        >
          H
        </button>
        <button
          onClick={() => insertFormatting("- ")}
          className="px-3 py-1 bg-white border rounded hover:bg-gray-100"
          title="Bullet List"
          type="button"
        >
          • List
        </button>
        <button
          onClick={() => insertFormatting("[", "](url)")}
          className="px-3 py-1 bg-white border rounded hover:bg-gray-100"
          title="Link"
          type="button"
        >
          🔗 Link
        </button>
        <button
          onClick={() => insertFormatting("\n\n---\n\n")}
          className="px-3 py-1 bg-white border rounded hover:bg-gray-100"
          title="Horizontal Line"
          type="button"
        >
          ―
        </button>
      </div>

      {/* Editor */}
      <div className="mb-3">
        <Label>Description (Markdown supported)</Label>
        <Textarea
          id="rich-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={12}
          className="font-mono text-sm"
          placeholder="Enter product description with markdown formatting..."
        />
      </div>

      {/* Markdown Guide */}
      <div className="mb-4 p-3 bg-blue-50 rounded-md border border-blue-200 text-sm">
        <p className="font-semibold text-blue-900 mb-2">📝 Markdown Quick Guide:</p>
        <ul className="text-blue-800 space-y-1 ml-4">
          <li><code>**bold**</code> → <strong>bold</strong></li>
          <li><code>*italic*</code> → <em>italic</em></li>
          <li><code>### Heading</code> → Heading</li>
          <li><code>- Item</code> → Bullet point</li>
          <li><code>[Link](url)</code> → Clickable link</li>
          <li><code>---</code> → Horizontal line</li>
        </ul>
      </div>

      {/* Preview */}
      <div className="mb-4">
        <Label>Preview</Label>
        <div 
          className="p-4 bg-gray-50 rounded-md border min-h-[100px]"
          dangerouslySetInnerHTML={{
            __html: description
              .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.+?)\*/g, '<em>$1</em>')
              .replace(/### (.+)/g, '<h3 class="text-xl font-bold mb-2">$1</h3>')
              .replace(/^- (.+)$/gm, '<li class="ml-4">• $1</li>')
              .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-blue-600 underline">$1</a>')
              .replace(/\n\n/g, '<br/><br/>')
              .replace(/---/g, '<hr class="my-4"/>')
          }}
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        type="button"
      >
        {saving ? "Saving..." : "Save Description"}
      </button>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.after",
})

export default ProductDescriptionEditor



