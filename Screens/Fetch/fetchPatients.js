export default fetchPatients=async()=>{
    const res=await fetch('http://192.168.0.101:8000/api/patients')
    const resJson=await res.json();
    return resJson;
}