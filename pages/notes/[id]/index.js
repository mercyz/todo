import axios from "axios"



const note = ({note}) => {
    return (<div className="w-full h-screen">
        <div className="container mx-auto">
            <div className="mt-16 mb-4 py-7 px-8 bg-white rounded-md  mr-1">
                <h4 href="#" className="font-semibold text-2xl mb-3 text-blue-700">{note.title}</h4>
                <p>{note.body}</p>
            </div>
        </div>      
        <style>{`
             body{
                background:whitesmoke
            }
        `}</style> 
    </div>)
}
export const getStaticProps = async (context) => {
    const res  = await axios.get(`http://localhost:3004/notes/${context.params.id}`)
    const note =  await res.data
    return {
        props:{
            note
        }
    }
}

export const getStaticPaths =  async () => {
    const res  = await axios.get(`http://localhost:3004/notes/`)
    const notes =  await res.data
    const ids = notes.map((note) => note.id)
    const paths = ids.map((id) => ({params: {id: id.toString() } } ))
    return {
        paths,
        fallback: false
    }
}

export default note