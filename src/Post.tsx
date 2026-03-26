import './index.css'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './components/ui/card'

function Post() {
  return (
    <Card className='h-[400px] w-[600px] bg-slate-800 p-5 border-slate-600 border text-white'>
        <CardHeader>
            <CardTitle className='font-bold'> Título do post </CardTitle>
        </CardHeader>

        <CardContent className='flex flex-col justify-between items-start flex-1 gap-5'>
            <p> Conteúdo do post </p>

            <div className='flex flex-row gap-5'>
                <p className='bg-slate-500 text-white text-[12px] rounded-full py-1 px-3'> 
                    Tag 1
                </p>
            </div>
        </CardContent>

        <CardFooter className='flex justify-between h-auto'>
            <div className='flex flex-row gap-5'>
                <p> Likes <span> 0 </span> </p>
                <p> Dislikes <span> 0 </span> </p>
            </div>

            <div className='text-slate-500'>
                <p> Views <span> 0 </span> </p>
            </div>
        </CardFooter>
    </Card>
  )
}

export default Post
