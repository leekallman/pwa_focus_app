const submitButton = ({ title, activeClass, _callback }) => {
    return (
        <button className={activeClass} onClick={_callback}>
            {title}
        </button >
    )
}
export default submitButton