export default function ApplicationLogo(props) {
    return (
        <img
            {...props}
            src="/images/Logo Kesbangpol.png"
            alt="Application Logo"
            className={props.className}
        />
    );
}
