import HomeIcon from '@material-ui/icons/HomeOutlined';
import DataProcessingIcon from '@material-ui/icons/Gavel';
import DataManageIcon from '@material-ui/icons/Storage';
import Models from '@material-ui/icons/FeaturedVideo';

export default [
  {
    subheader: 'Menu',
    items: [
      {
        title: '홈',
        href: '/overview',
        icon: HomeIcon
      },
      {
        title: '데이터 전처리',
        href: '/data-process',
        icon: DataProcessingIcon
      },
      {
        title: '데이터 관리',
        href: '/data-management',
        icon: DataManageIcon
      },
      // {
      //   title: 'Model',
      //   href: '/models-home',
      //   icon: Models
      // }
    ]
  }
];
