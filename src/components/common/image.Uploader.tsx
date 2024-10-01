import { useState } from "react";
import { ImageComponent } from "@/app/db/definitions";

export const SingleImageUpload = ({ name, msg, imageUrl = null, }: ImageComponent) => {
    const [thumb, setThumb] = useState();
    return (<>
        <div className='inline-flex items-start gap-5 w-full'>
            <div className="flex-grow">
                <input className="w-1/2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id={name}
                    type="file"
                    name={name}
                    accept="image/*"

                    onChange={(e: any) => {
                        e.preventDefault();
                        const name = e.target.name;
                        const image = e.target.files[0];
                        setThumb(image)
                    }}
                />
                <div>
                    <span className="mt-2 text-sm text-red-500">{msg}</span>
                </div>

            </div>
            <img className="w-1/4" src={thumb && typeof thumb === 'object' ? URL.createObjectURL(thumb) : (imageUrl && typeof imageUrl === 'string' ? imageUrl : 'https://placehold.co/150x100?text=Image not found')} alt="uploaded image" />
        </div>

    </>)
}
