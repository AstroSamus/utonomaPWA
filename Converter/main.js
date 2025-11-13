document.getElementById("epubInput").addEventListener("change", handleFileSelect);
document.getElementById("downloadHtml").addEventListener("click", downloadHtml);

let htmlContent = "";  // To store the merged HTML content

async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    document.getElementById("statusMessage").textContent = "Processing EPUB file...";
    htmlContent = "";  // Reset the HTML content

    try {
        const zip = await JSZip.loadAsync(file);
        
        // Get all files in the EPUB and filter to get only HTML/XHTML files
        const htmlFiles = [];
        zip.forEach((relativePath, file) => {
            if (relativePath.endsWith(".html") || relativePath.endsWith(".xhtml")) {
                htmlFiles.push(file);
            }
        });

        // Sort and process each HTML file, appending content to htmlContent
        for (const file of htmlFiles) {
            const fileContent = await file.async("string");
            htmlContent += fileContent;  // Append the content of each HTML/XHTML file
        }

        document.getElementById("downloadHtml").disabled = false;
        document.getElementById("statusMessage").textContent = "EPUB file converted to HTML successfully!";
    } catch (error) {
        console.error("Error processing EPUB file:", error);
        document.getElementById("statusMessage").textContent = "Failed to convert EPUB file to HTML.";
    }
}

function downloadHtml() {
    if (!htmlContent) return;

    // Create a Blob from the HTML content
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    // Create a temporary link to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.html";
    a.click();

    // Clean up
    URL.revokeObjectURL(url);
}