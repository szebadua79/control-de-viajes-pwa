import React, { useEffect, useMemo, useRef, useState } from 'react';
function formatDateTime(d){const p=n=>String(n).padStart(2,'0');return`${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;}
function toCSV(rows){const h=['fecha_hora','camion','operador','material','volumen_m3','observaciones'];const l=[h.join(',')];rows.forEach(r=>{const v=[r.fecha_hora,r.camion,r.operador,r.material,r.volumen_m3,String(r.observaciones||'').replace(/,/g,';')];l.push(v.map(x=>`"${x}"`).join(','));});return l.join('\n');}
function download(f,t){const b=new Blob([t],{type:'text/csv'});const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download=f;a.click();a.remove();URL.revokeObjectURL(u);}
const KEY='control_viajes_local_v1';
export default function App(){const[c,setC]=useState('');const[o,setO]=useState('');const[m,setM]=useState('Grava');const[v,setV]=useState(7);const[obs,setObs]=useState('');const[data,setD]=useState([]);const[f,setF]=useState(()=>new Date().toISOString().slice(0,10));const r=useRef(null);
useEffect(()=>{const d=localStorage.getItem(KEY);if(d)try{setD(JSON.parse(d));}catch{}},[]);
useEffect(()=>{localStorage.setItem(KEY,JSON.stringify(data));},[data]);
const add=()=>{if(!c.trim())return alert('Ingresa camión');const n=new Date();const x={id:Date.now(),fecha_hora:formatDateTime(n),fecha:n.toISOString().slice(0,10),camion:c.trim().toUpperCase(),operador:o.trim(),material:m.trim(),volumen_m3:Number(v)||0,observaciones:obs.trim()};setD(p=>[x,...p]);setO('');setObs('');setV(7);setTimeout(()=>r.current?.focus(),0);};
const exp=()=>{const fD=data.filter(z=>!f||z.fecha===f);download(`control_viajes_${f}.csv`,toCSV(fD));};
const fil=data.filter(z=>!f||z.fecha===f);const tV=fil.length;const tVol=fil.reduce((a,b)=>a+Number(b.volumen_m3||0),0);
return <div style={{padding:16,background:'#F8FAFC',minHeight:'100vh',color:'#0F172A'}}><div style={{maxWidth:900,margin:'0 auto'}}><h1 style={{fontSize:24,fontWeight:800}}>Control de Viajes</h1>
<div style={{background:'#FFF',borderRadius:16,padding:16,marginTop:12}}>
  <div style={{display:'grid',gap:8,gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))'}}>
    <div><label>Camión</label><input ref={r} value={c} onChange={e=>setC(e.target.value)} style={{width:'100%',padding:8,border:'1px solid #CBD5E1',borderRadius:8}}/></div>
    <div><label>Operador</label><input value={o} onChange={e=>setO(e.target.value)} style={{width:'100%',padding:8,border:'1px solid #CBD5E1',borderRadius:8}}/></div>
    <div><label>Material</label><input value={m} onChange={e=>setM(e.target.value)} style={{width:'100%',padding:8,border:'1px solid #CBD5E1',borderRadius:8}}/></div>
    <div><label>Volumen (m³)</label><input type='number' value={v} onChange={e=>setV(e.target.value)} style={{width:'100%',padding:8,border:'1px solid #CBD5E1',borderRadius:8}}/></div>
    <div style={{gridColumn:'1/-1'}}><label>Observaciones</label><input value={obs} onChange={e=>setObs(e.target.value)} style={{width:'100%',padding:8,border:'1px solid #CBD5E1',borderRadius:8}}/></div>
    <button onClick={add} style={{background:'#F97316',color:'#fff',fontWeight:700,border:'none',padding:10,borderRadius:10,gridColumn:'1/-1'}}>Registrar viaje</button>
  </div></div>
<div style={{background:'#FFF',borderRadius:16,padding:16,marginTop:12}}><label>Fecha</label><div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}><input type='date' value={f} onChange={e=>setF(e.target.value)} style={{padding:8,border:'1px solid #CBD5E1',borderRadius:8}}/><div>Viajes: <b>{tV}</b></div><div>Volumen total: <b>{tVol.toFixed(1)} m³</b></div><button onClick={exp} style={{marginLeft:'auto',background:'#1E3A8A',color:'#fff',fontWeight:700,border:'none',padding:'8px 12px',borderRadius:8}}>Exportar CSV</button></div></div>
<div style={{background:'#FFF',borderRadius:16,marginTop:12,overflow:'hidden'}}><table style={{width:'100%',fontSize:14}}><thead style={{background:'#F1F5F9',color:'#475569'}}><tr><th>Fecha y hora</th><th>Camión</th><th>Operador</th><th>Material</th><th>m³</th><th>Obs.</th></tr></thead><tbody>{fil.length===0?<tr><td colSpan='6' style={{textAlign:'center',padding:12}}>Sin datos</td></tr>:fil.map(r=><tr key={r.id} style={{borderTop:'1px solid #E2E8F0'}}><td>{r.fecha_hora}</td><td>{r.camion}</td><td>{r.operador}</td><td>{r.material}</td><td>{r.volumen_m3}</td><td>{r.observaciones}</td></tr>)}</tbody></table></div>
<p style={{fontSize:12,textAlign:'center',color:'#64748B',marginTop:16}}>© 2025 Sergio Naraín Zebadúa Alva. Todos los derechos reservados.</p></div></div>;}
