// in progress
export function getBlobUrl(filePath: string): string {
  const storageAccountName: string = import.meta.env.VITE_STORAGE_ACCT;
  const containerName: string = import.meta.env.VITE_BLOB_CONTAINER;
  const sasToken: string = import.meta.env.VITE_BLOB_SAS_TOKEN;

  const blobUrl: string = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${filePath}?${sasToken}`;

  return blobUrl;
}