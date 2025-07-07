import React from 'react'
import { TextInput, Textarea, Label, Checkbox, Button } from 'flowbite-react'
import { IoIosMail } from 'react-icons/io'
import { FaWhatsapp } from 'react-icons/fa'

export default function AboutPage() {
    return (
        <div className="relative isolate bg-white dark:bg-[rgb(22,26,29)] px-6 py-24 sm:py-32 lg:px-8">
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 -z-50 transform-gpu overflow-hidden blur-3xl sm:-top-0"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 85% 110%, 90% 125%, 95% 140%, 98% 155%, 100% 170%, 100% 200%)',
                    }}
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#48ff00] to-[#0f63e2] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] animate-pulse"
                />
            </div>

            <div className="mx-auto max-w-2xl text-center">
                <p className="font-avenir font-bold text-4xl tracking-tight text-balance text-gray-900 dark:text-gray-50 sm:text-5xl"><span className='mr-2'>💫</span> Who are we?</p>
                <p className="font-montserrat font-normal my-2 text-lg/8 text-gray-600 dark:text-gray-400">At JewelryStore, we are a team of curious individuals with diverse backgrounds and various areas of expertise, all brought together by a shared can-do attitude. By collaborating across different fields and areas of know-how, together, we develop brands with unique value propositions and engineer sustainable, seamlessly tailored shopping experiences for the evolving and dynamic needs of modern-day customers.</p>
            </div>



            <div className="mx-auto m-20 max-w-4xl">
                <h2 className="font-avenir font-bold text-center mb-4 text-4xl tracking-tight text-balance text-gray-900 dark:text-gray-50 sm:text-5xl">Our Location</h2>
                <div className="flex justify-center">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3007.754343113034!2d29.015816176427528!3d41.07436211535252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac881dc6d7621%3A0x1506248fe364a90f!2sRENART%20GLOBAL!5e0!3m2!1str!2sus!4v1751925190623!5m2!1str!2sus"
                        width="1000"
                        height="500"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </div>
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="font-avenir font-bold text-4xl tracking-tight text-balance text-gray-900 dark:text-gray-50 sm:text-5xl">Contact Us</h2>
                <p className="font-montserrat font-normal my-2 text-lg/8 text-gray-600 dark:text-gray-400">You can contact us for anything you can think of. Either by sending a message or by calling directly...</p>
                <div className='flex justify-center items-center'>
                    <p className='text-xl sm:text-2xl font-semibold'>+90 543 000 00 00</p>
                    <FaWhatsapp className='text-green-500 text-4xl ml-2' />
                </div>
                <div className='flex justify-center items-center'>
                    <p className='text-xl sm:text-2xl font-semibold'>customer@gmail.com</p>
                    <IoIosMail className='text-gray-800 dark:text-gray-300 text-4xl mt-1 ml-2' />
                </div>
            </div>


            <div className="mx-auto mt-10 max-w-xl sm:mt-16">
                <h2 className="font-avenir font-medium text-2xl tracking-tight text-balance text-center text-gray-800 dark:text-gray-50 sm:text-4xl mb-3">Contact Form</h2>
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <div className="mb-1 block">
                            <Label htmlFor="name" value="Your name" />
                        </div>
                        <TextInput id="name" type="text" sizing='md' required />
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label htmlFor="surname" value="Your surname" />
                        </div>
                        <TextInput id="surname" type="text" sizing='md' required />
                    </div>
                    <div className="sm:col-span-2">
                        <div className="mb-1 block">
                            <Label htmlFor="email" value="E-mail" />
                        </div>
                        <TextInput id="email" type="email" sizing='md' required />
                    </div>
                    <div className="sm:col-span-2">
                        <div className="mb-1 block">
                            <Label htmlFor="phonenumber" value="Your phone number" />
                        </div>
                        <TextInput id="phonenumber" type="tel" sizing='md' placeholder='+XX XXXXXXXXXX' required />
                    </div>
                    <div className="sm:col-span-2">
                        <Label htmlFor="message" value="Message" />
                        <Textarea className='min-h-20 max-h-80 sm:max-h-40 mt-1' id='message' placeholder='Leave a message...' rows='3' maxLength='800' required />
                        <p className='text-gray-500 dark:text-gray-400 text-xs mb-3'>... characters remaining</p>
                    </div>
                    <div className="flex gap-x-4 sm:col-span-2">
                        <div className="flex h-6 items-center">
                            <Checkbox id="accept" required />
                        </div>
                        <Label className="text-sm/6 text-gray-600 dark:text-gray-50">
                            By selecting this, you agree to our{' '}
                            <a href="#" className="font-semibold text-sky-700 dark:text-sky-600">
                                privacy&nbsp;policy
                            </a>
                            .
                            <p className='text-gray-500 dark:text-gray-400 text-xs'>(required)</p>
                        </Label>
                    </div>
                    <div className='flex justify-center sm:col-span-2'>
                        <Button type="submit" outline gradientDuoTone="greenToBlue" className='w-full'>
                            Send
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    )
}