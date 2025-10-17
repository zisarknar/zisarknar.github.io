import Image from "next/image"
import SectionTitle from "../components/SectionTitle"

const Page = () =>

    <main className="flex min-h-full w-full justify-center items-center px-20">
        {/* About me section */}
        <section className="flex my-8 w-full justify-between items-start">
            <div className="w-1/2">
                <SectionTitle title="About Me" />
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, provident ex? Officia nostrum provident laudantium, dolore aut ducimus cumque accusantium, doloribus quo rem perspiciatis quibusdam quod nulla veritatis. Voluptatum, illo.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, provident ex? Officia nostrum provident laudantium, dolore aut ducimus cumque accusantium, doloribus quo rem perspiciatis quibusdam quod nulla veritatis. Voluptatum, illo.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, provident ex? Officia nostrum provident laudantium, dolore aut ducimus cumque accusantium, doloribus quo rem perspiciatis quibusdam quod nulla veritatis. Voluptatum, illo.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, provident ex? Officia nostrum provident laudantium, dolore aut ducimus cumque accusantium, doloribus quo rem perspiciatis quibusdam quod nulla veritatis. Voluptatum, illo.
                </p>
            </div>
            <div className="w-1/2 flex justify-center items-center">
                <Image width={400} height={600} src="https://i.pinimg.com/236x/a6/bc/64/a6bc64bf4eefbca2184982167f576325.jpg" alt="personl" />
            </div>

        </section>
    </main>



export default Page

