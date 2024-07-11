# MortezaExpress
MortezaExpress in a lightweight and simple framework for building web applications with node js.
# Features
- Simple routing
- Strongly typed
- Serving static files
# How To Install
Install this package using
```
npm install mortezaexpress
```
# Usage
Here's the examplw of using mortezaexpress:
```
const express=require('mortezaexpress')
const app=express()

app.get('/',(req,res,next)=>{
    res.json({
        message:'Hello World'
    })
})

app.listen(8000,()=>{
    console.log('app is running');
})
```
# Static Files
For serving static files you can use:
```
const mortezaexpess=require("mortezaexpress")
app.use(mortezaexpress("public"))
```
# Middlewares
You can add middlewares using:
```
app.use((req,res,next)=>{
    console.log('middleware');
    next()
})
```






