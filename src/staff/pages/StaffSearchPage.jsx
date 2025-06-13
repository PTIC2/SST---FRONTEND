import { NavigationLayout } from '../../app/layouts/NavigationLayout.jsx';
import { StaffSearchComponent } from '../components/staffEntry/StaffSearchComponent.jsx';

export const StaffSearchPage = () => {
  return (
    <NavigationLayout title='Ingreso de Personal'>
        <StaffSearchComponent />
    </NavigationLayout>
  )
}
