import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  select: {
    padding: 10,
    border: '1px solid gray',
    outline: 'none',
    borderRadius: 5,
    marginTop:7
  },
}));
interface Props {
  label: string;
  type: string;
  value: any;
  name: string;
  options: Array<any>;
  handleChange(event: any): void;
}
export const SelectInput = ({ label, value, name,  options, handleChange }: Props) => {
  const classes = useStyles();

  const RenderMenuItems = () => {
    return (
        options.map((item) => { return ( <option key={item.value} value={item.value}>{item.label}</option> )})
    )
  };
  return (
    <>
      <select
        className={classes.select}
        value={value}
        onChange={(e) => { value=e.target.value,handleChange({ val: value, name: name }) }}
      >
        <option defaultValue={``}>{label}</option>
        {RenderMenuItems()}
      </select>
    </>
  );
};
