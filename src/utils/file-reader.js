/**
 * @param {File} file
 * @returns {Promise<string>}
 */
export function readLocalFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.toString());
    reader.onerror = reject;
    reader.readAsText(file);
  });
}
