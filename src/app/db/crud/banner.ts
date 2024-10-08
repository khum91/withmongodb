'use server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import Banner from '../models/banner,model';
import { connect } from '../mongodbconfig';
import { filename } from '@/lib/stringmanipulation';
import cloudinary from '../cloudinaryconfig';
// import { filename } from '@/components/lib/randomString';

connect()
const BannerSchema = z.object({
    id: z.string(),
    name: z.string().min(1, { message: "Banner name is required" }).trim(),
    link: z.string().url(),
    image: z.string().min(1, { message: "Image is required" }).trim(),
});

const Add = BannerSchema.omit({ id: true });

export type State = {
    errors?: {
        name?: string[];
        link?: string[];
        image?: string[];
    };
    message?: string | null;
    info?: boolean | false;
};

export async function addBanner(prevState: State, formData: FormData) {

    let iname = ''
    const file = formData.get('image') as File
    if (file && file.size > 0) {
        iname = filename(file)
    }

    const validatedFields = Add.safeParse({
        name: formData.get('name'),
        status: formData.get('status'),
        link: formData.get('link'),
        image: iname,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Add this item.',
        };
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer)

    try {

        const { name, link, image } = validatedFields.data;
        const newItem = new Banner({ name, link, image });
        await newItem.save()

        await cloudinary.uploader.upload_stream({ folder: 'thefarm', public_id: `${iname}` }).end(buffer);

        // for delete
        // await cloudinary.uploader.destroy('thefarm/ottQif25Y8oKxOgsIZFJ-6468.jpeg');

        //for update
        // await cloudinary.uploader.upload_stream({ folder: 'thefarm', public_id: 'ottQif25Y8oKxOgsIZFJ-6468.jpeg', overwrite: true }).end(buffer);


        revalidatePath('/');
        return ({
            message: "Banner updated successfully",
            info: true,
        })
    } catch (error: any) {
        console.log(error)
        if (+error.code === 11000) {
            return ({
                message: 'Duplicate field ' + JSON.stringify(error.keyValue)
            })

        } else {
            return {
                message: 'Database Error: Failed to add.',
            }
        }
    }
}
