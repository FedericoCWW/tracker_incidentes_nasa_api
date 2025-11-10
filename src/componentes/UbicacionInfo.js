
const  UbicacionInfo = ({ info }) => {
  return (
    <div className="ubicacion-info">
        <h2>Informacion de ubicacion</h2>
        <ul>
            <li><strong>ID: </strong> {info.id}</li>
            <li><strong>Titulo: </strong> {info.title}</li>
            <li><strong>Fecha: </strong> {info.date}</li>
            <li><strong>Url: </strong> <a href={info.url} target="_blank">{info.url}</a></li>
        </ul>
    </div>
  )
};

export default UbicacionInfo