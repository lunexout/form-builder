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
  identor: string;
  options: Array<any>;
  handleChange(event: any): void;
}

export const SelectInput = ({
  label,
  value,
  identor,
  options,
  handleChange,
}: Props) => {
  const classes = useStyles();
  const RenderMenuItems = () => {
    return (
      <>
        {options.map((item,i) => {
          return (
            <>
              <option key={item.value+i} value={item.value}>{item.label}</option>
            </>
          );
        })}
      </>
    );
  };
  return (
    <>
      <select
        className={classes.select}
        value={value}
        onChange={(e) => {
          value = e.target.value
          const event = { val: value, name: identor }
          handleChange(event)
        }}
      >
        <option>{label}</option>
        <RenderMenuItems />
      </select>
    </>
  );
};
