import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
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
  handleChange(event: any): void;
  value: any;
  identor: string;
  options: Array<any>;
}

export const SelectInput = ({
  label,
  type,
  handleChange,
  value,
  identor,
  options,
}: Props) => {
  const classes = useStyles();
  const RenderMenuItems = () => {
    return (
      <>
        {options.map((item,i) => {
          return (
            <>
              {/* {i == 0 && (handleChange({val:item.value, name: identor}))} */}
              <option value={item.value}>{item.label}</option>
            </>
          );
        })}
      </>
    );
  };
  return (
    <>
      {/* <InputLabel htmlFor="outlined-age-native-simple">{label}</InputLabel> */}
      <select
        className={classes.select}
        value={value}
        onChange={(e) => {
          value = e.target.value
          const event = {
            val: value,
            name: identor
          }
          handleChange(event)
        }}
      >
      <option>{label}</option>
        <RenderMenuItems />
      </select>
    </>
  );
};
