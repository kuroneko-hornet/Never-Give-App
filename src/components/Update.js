import Button from '@mui/material/Button';


// export const updateApp = () => {
//     console.log("updateApp")
//     navigator.serviceWorker.ready
//         .then((registration) => {console.log("registration"); registration.unregister();})
//         .then(() => { console.log("reload"); window.location.reload(); });
// }

export default function UpdateButton() {
    return <Button onClick={() => window.location.reload()}>
        Reload
    </Button>
}