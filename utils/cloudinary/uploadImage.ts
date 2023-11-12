import cloudinary from "./configure";

export default async function uploadImage({ imageStr, public_id }) {
	const res = await cloudinary.v2.uploader.upload(imageStr, { public_id });

	return res.secure_url;
}
