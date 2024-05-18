export const DriveURL = (link:string)=>{
 const fileIdMatch = link.match(/\/d\/(.*)\/view/);
  const fileId = fileIdMatch ? fileIdMatch[1] : "";
  const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
  return url;
};