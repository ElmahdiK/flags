const Flag = (props) => {
    const { urlCdn, code, name } = props;
    return <><img src={urlCdn + `/` + code + `.svg`} alt={code} />
        <p>{name}</p></>
}

export default Flag;