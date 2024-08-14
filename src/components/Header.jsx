function Header(props) {
    const { country, onChange } = props;
    return (
        <header>
            <h1>{country}</h1>
            <input
                type="search"
                placeholder="Enter a country ..."
                onChange={(event) => onChange(event.target.value)}
            />
        </header>
    );
}
export default Header;