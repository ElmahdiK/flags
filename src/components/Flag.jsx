const Flag = (props) => {
    const { urlCdn, code, name, onClick } = props;
    return (
        <li key={code} onClick={() => onClick(code, name)}>
            <img src={urlCdn + `/` + code + `.svg`} alt={code} />
            <p>{name}</p>
        </li>
    );
}

export default Flag;