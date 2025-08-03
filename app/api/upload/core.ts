// import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server";

// const f = createUploadthing();

// export const ourFileRouter = {
//   refereeReportUploader: f(["image", "pdf"])
//     // Set permissions and file types for this FileRoute
//     // .middleware(({ req }) => {
//     //   // This code runs on your server before upload
//     //   const user = auth(req);
//     //   return { userId: "user.id" };
//     // })
//     .onUploadComplete(async ({ metadata, file }) => {
//       console.log("file url", file.url);
//       // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
//       return { fileUrl: file.url };
//     }),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;
