import React, { Dispatch, SetStateAction } from 'react';
import Input from '@/components/public/ui/Input';
import SelectLocation from '@/components/SelectLocation';

type ShippingInfo = {
  receiverName: string;
  lastName: string;
  address: string;
  province: string;
  district: string;
  ward: string;
};

type LocationSelectValue = {
  province: string;
  district: string;
  ward: string;
};

type Props = {
  shippingInfo: ShippingInfo;
  setShippingInfo: Dispatch<SetStateAction<ShippingInfo>>;
};

const ShippingAddressForm = ({ shippingInfo, setShippingInfo }: Props) => {
  const handleLocationChange = (value: LocationSelectValue) => {
  setShippingInfo(prev => ({
    ...prev,
    province: value.province,
    district: value.district,
    ward: value.ward,
  }));
};
  return (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-6">Shipping Address</h2>
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          required
          placeholder="First Name"
          className="input"
          value={shippingInfo.receiverName}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, receiverName: e.target.value })
          }
        />
        <Input
          required
          placeholder="Last Name"
          className="input"
          value={shippingInfo.lastName}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, lastName: e.target.value })
          }
        />
      </div>

      <Input
        required
        placeholder="Address"
        className="input"
        value={shippingInfo.address}
        onChange={(e) =>
          setShippingInfo({ ...shippingInfo, address: e.target.value })
        }
      />

      <SelectLocation value={{province: shippingInfo.province, district: shippingInfo.district, ward: shippingInfo.ward}} onChange={handleLocationChange} />
      {/* setLocationInfo */}
      <Input placeholder="Address" value={shippingInfo.address} onChange={(e) =>
            setShippingInfo({ ...shippingInfo, address: e.target.value })
          }
      />    
      {/* disabled={!locationInfo.ward} */}
    </form>
  </div>
)} ;

export default ShippingAddressForm;
