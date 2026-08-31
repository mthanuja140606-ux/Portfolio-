export const forceDownload = async (fileUrl, fileName) => {
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error('Network response was not ok');
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed, falling back to open in new tab:', error);
    window.open(fileUrl, '_blank');
  }
};
