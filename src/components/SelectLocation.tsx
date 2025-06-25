'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

import CustomSelect from './ui/customSelect';

interface LocationData {
  Name: string;
  Districts: {
    Name: string;
    Wards: {
      Name: string;
    }[];
  }[];
}

type LocationSelectValue = {
  province: string;
  district: string;
  ward: string;
};

type Props = {
  value: LocationSelectValue;
  onChange: (value: LocationSelectValue) => void;
};

export default function LocationSelect({ value, onChange }: Props) {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const update = (patch: Partial<LocationSelectValue>) => {
    onChange({ ...value, ...patch });
  };

  const province = locations.find(p => p.Name === value.province);
  const district = province?.Districts.find(d => d.Name === value.district);
  const wards = district?.Wards || [];

  const provinceOptions = locations.map(loc => ({ label: loc.Name, value: loc.Name }));
  const districtOptions = province?.Districts.map(d => ({ label: d.Name, value: d.Name })) || [];
  const wardOptions = district?.Wards.map(w => ({ label: w.Name, value: w.Name })) || [];

  useEffect(() => {
    axios
      .get<LocationData[]>('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
      .then(res => setLocations(res.data))
      .catch(err => console.error('Lỗi tải location:', err));
  }, []);

  return (
    <div className="space-y-4 grid gap-3 grid-cols-3">
      <div>
        <label className="block mb-1">Tỉnh/Thành phố</label>
        <CustomSelect
          options={[{ label: 'Tỉnh/Thành', value: '' }, ...provinceOptions]}
          value={value.province}
          onChange={val => update({ province: val, district: '', ward: '' })}
          searchable
        />
      </div>

      <div>
        <label className="block mb-1">Quận/Huyện</label>
        <CustomSelect
          options={[{ label: 'Quận/Huyện', value: '' }, ...districtOptions]}
          value={value.district}
          onChange={val => update({ district: val, ward: '' })}
          searchable
        />
      </div>

      <div>
        <label className="block mb-1">Phường/Xã</label>
        <CustomSelect
          options={[{ label: 'Chọn Phường/Xã', value: '' }, ...wardOptions]}
          value={value.ward}
          onChange={val => update({ ward: val })}
          searchable
        />
      </div>
      
    </div>
  );
}
