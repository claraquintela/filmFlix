import './Filtre.css';

const Filtre = (props) => {
 
    const onOptionSelected = (event) => ( 
       props.whenChanged(event.target.value)
    )

    return (
        <div className='dropdown'>
            <label>
                {props.label}
            </label>

            <select onChange={onOptionSelected}> 
                {props.list.map(item =><option key={item.item} value={item.thisQuery}>{item.item}</option> )}
            </select>

        </div>
    )
}

export default Filtre