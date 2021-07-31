import swal from 'sweetalert';

export const ShowAlert = (props) => {
  return(
    <>
      {swal({
        title: `${props.header}`,
        text: `${props.text}`,
        icon: `${props.error ? 'error' : 'success'}`,
      })
      }
    </>
  )
}
