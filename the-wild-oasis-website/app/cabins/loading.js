import Spinner from "../_components/Spinner"

function loading() {
    return (
        <div className="grid items-center justify-center">
        <Spinner />
        <p className="text-xl text-primary-200">loading cabins data...</p>
        </div>
    )
}

export default loading
