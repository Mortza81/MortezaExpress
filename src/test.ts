import { resolveTypeReferenceDirective } from "typescript";
import MortezaExpress from "./app"
const app=MortezaExpress()
app.use((req,res,next)=>{
    console.log('test1');
    next()
},(req,res,next)=>{
    console.log('test2');
    next()
})
app.delete('/test',(req,res)=>{
    res.json({
        message:'delete'
    })
})
app.post('/test',(req,res)=>{
    res.json({
        message:'post'
    })
})
app.put('/test',(req,res)=>{
    res.json({
        message:'put'
    })
})
app.get('/test',(req,res)=>{
    res.json({
        message:'get'
    })
})
app.use((req,res,next)=>{
    console.log('it should not work');
    next()
})
app.listen(8000,()=>{
    console.log('app is running');
})