'use client'
import { useFormState } from 'react-dom';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/common/button"
import { addBanner, State } from '@/app/db/crud/banner';
import Swal from 'sweetalert2'
import { redirect } from 'next/navigation';

export default function Form() {
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useFormState(addBanner, initialState);
    const [loading, setLoading] = useState<boolean>()


    useEffect(() => {
        setLoading(true)
        if (state.info) {
            Swal.fire({
                timer: 1500,
                text: 'Added',
                icon: "success",
            });
            redirect('/');
        }
        setLoading(false)
    }, [state])


    return (
        <>
            {loading ? <><h1>Please Wait ....... </h1>
            </> : <>
                <form action={formAction}>
                    {state.info ?? <p className="mt-2 text-sm text-red-500">
                        {state.message}
                    </p>
                    }
                    <div className="rounded-md bg-gray-50 p-4 md:p-6">

                        <div className="mb-4">
                            <label htmlFor="name" className="mb-2 block text-sm font-medium">
                                Name
                            </label>
                            <div className="relative">
                                <input
                                    id="name"
                                    name="name"
                                    type="string"
                                    placeholder="Enter banner name"
                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    aria-describedby="name-error"
                                />
                            </div>
                            <div id="name" aria-live="polite" aria-atomic="true">
                                {state.errors?.name &&
                                    state.errors.name.map((error: string) => (
                                        <p className="mt-2 text-sm text-red-500" key={error}>
                                            {error}
                                        </p>
                                    ))}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="link" className="mb-2 block text-sm font-medium">
                                Link
                            </label>
                            <div className="relative">
                                <input
                                    id="link"
                                    name="link"
                                    type="string"
                                    placeholder="Enter banner link"
                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    aria-describedby="link-error"
                                />
                            </div>
                            <div id="link" aria-live="polite" aria-atomic="true">
                                {state.errors?.link &&
                                    state.errors.link.map((error: string) => (
                                        <p className="mt-2 text-sm text-red-500" key={error}>
                                            {error}
                                        </p>
                                    ))}
                            </div>
                        </div>

                    </div>
                    <div className="mt-6 flex justify-end gap-4">
                        <Link
                            href="/dashboard/banner"
                            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                        > Cancel</Link>
                        <Button type="submit">Add</Button>
                    </div>
                </form>
            </>}
        </>
    );
}
