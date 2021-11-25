import axios from 'axios'
import Head from 'next/head'
import Link from "next/link"


const Notes = ({notes}) => {
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Head>
          <title>Handy Notes</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-5xl font-bold">
            <a className="text-blue-600" >
             Handy Notes
            </a>
          </h1>
  
          <p className="mt-3 text-2xl">
            Make a quick note for your todos
          </p>
  
          <div className="flex flex-wrap items-center justify-around max-w-7xl mt-6 sm:w-full">
              {
                  notes.map((note) => (
                        <Link href={`/notes/${note.id}`}>
                            <a
                            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
                            >
                            <h3 className="text-2xl font-bold">{note.title.substring(0, 25)} &rarr;</h3>
                            <p className="mt-4 text-xl">
                               {note.body.substring(0, 50)}.
                            </p>
                            </a>
                        </Link>

                  ))
              }  
          </div>
        </main>
      </div>
    )
}

export const getStaticProps = async () => {
    const res =  await axios.get(`http://localhost:3004/notes`)
    const notes = res.data
    return{
        props: {
            notes
        }
    }
}

export default Notes