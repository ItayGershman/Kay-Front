import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const AppLoader = () => {
  //other logic
  return (
    <div style={{ position: 'fixed', left: '44%', top: '50%' }}>
      <Loader
        type='Puff'
        color='#00BFFF'
        height={100}
        width={100}
        //   timeout={3000} //3 secs
      />
    </div>
  );
};
export default AppLoader;
