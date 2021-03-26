import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const AppLoader = () => {
  //other logic
  return (
    <div style={{ position: 'fixed', left: '44%', top: '50%' }}>
      <Loader
        type='Bars'
        color='#00BFFF'
        height={100}
        width={100}
      />
    </div>
  );
};
export default AppLoader;
