import  flatbuffers  from 'flatbuffers';
import { drive } from './protocol.js'




let x = new drive.CarScanEventT();
x.name = "fred"

let builder = new flatbuffers.Builder();
x.pack(builder)
let buffer = builder.asUint8Array();

console.log(buffer)
