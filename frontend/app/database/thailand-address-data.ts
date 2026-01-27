// ข้อมูลจังหวัด อำเภอ ตำบล ของประเทศไทย

export interface SubDistrict {
  value: string;
  label: string;
  postalCode: string;
}

export interface District {
  value: string;
  label: string;
  subDistricts: SubDistrict[];
}

export interface Province {
  value: string;
  label: string;
  districts: District[];
}

export const thailandAddressData: Province[] = [
  // กรุงเทพมหานคร
  {
    value: 'กรุงเทพมหานคร',
    label: 'กรุงเทพมหานคร',
    districts: [
      {
        value: 'คลองเตย',
        label: 'คลองเตย',
        subDistricts: [
          { value: 'คลองเตย', label: 'คลองเตย', postalCode: '10110' },
          { value: 'คลองตัน', label: 'คลองตัน', postalCode: '10110' },
          { value: 'คลองเตยเหนือ', label: 'คลองเตยเหนือ', postalCode: '10110' },
          { value: 'พระโขนง', label: 'พระโขนง', postalCode: '10110' },
        ],
      },
      {
        value: 'วัฒนา',
        label: 'วัฒนา',
        subDistricts: [
          { value: 'คลองเตยเหนือ', label: 'คลองเตยเหนือ', postalCode: '10110' },
          { value: 'คลองตันเหนือ', label: 'คลองตันเหนือ', postalCode: '10110' },
          { value: 'พระโขนงเหนือ', label: 'พระโขนงเหนือ', postalCode: '10110' },
        ],
      },
      {
        value: 'ปทุมวัน',
        label: 'ปทุมวัน',
        subDistricts: [
          { value: 'ปทุมวัน', label: 'ปทุมวัน', postalCode: '10330' },
          { value: 'ลุมพินี', label: 'ลุมพินี', postalCode: '10330' },
          { value: 'รองเมือง', label: 'รองเมือง', postalCode: '10330' },
          { value: 'วังใหม่', label: 'วังใหม่', postalCode: '10330' },
        ],
      },
      {
        value: 'บางรัก',
        label: 'บางรัก',
        subDistricts: [
          { value: 'มหาพฤฒาราม', label: 'มหาพฤฒาราม', postalCode: '10500' },
          { value: 'สีลม', label: 'สีลม', postalCode: '10500' },
          { value: 'สุริยวงศ์', label: 'สุริยวงศ์', postalCode: '10500' },
          { value: 'บางรัก', label: 'บางรัก', postalCode: '10500' },
        ],
      },
      {
        value: 'สาทร',
        label: 'สาทร',
        subDistricts: [
          { value: 'ทุ่งมหาเมฆ', label: 'ทุ่งมหาเมฆ', postalCode: '10120' },
          { value: 'ยานนาวา', label: 'ยานนาวา', postalCode: '10120' },
          { value: 'ทุ่งวัดดอน', label: 'ทุ่งวัดดอน', postalCode: '10120' },
        ],
      },
      {
        value: 'ห้วยขวาง',
        label: 'ห้วยขวาง',
        subDistricts: [
          { value: 'ห้วยขวาง', label: 'ห้วยขวาง', postalCode: '10310' },
          { value: 'บางกะปิ', label: 'บางกะปิ', postalCode: '10310' },
          { value: 'สามเสนนอก', label: 'สามเสนนอก', postalCode: '10310' },
        ],
      },
      {
        value: 'บางกะปิ',
        label: 'บางกะปิ',
        subDistricts: [
          { value: 'คลองจั่น', label: 'คลองจั่น', postalCode: '10240' },
          { value: 'หัวหมาก', label: 'หัวหมาก', postalCode: '10240' },
          { value: 'สะพานสูง', label: 'สะพานสูง', postalCode: '10240' },
        ],
      },
      {
        value: 'จตุจักร',
        label: 'จตุจักร',
        subDistricts: [
          { value: 'ลาดยาว', label: 'ลาดยาว', postalCode: '10900' },
          { value: 'เสนานิคม', label: 'เสนานิคม', postalCode: '10900' },
          { value: 'จันทรเกษม', label: 'จันทรเกษม', postalCode: '10900' },
          { value: 'จอมพล', label: 'จอมพล', postalCode: '10900' },
          { value: 'จตุจักร', label: 'จตุจักร', postalCode: '10900' },
        ],
      },
      {
        value: 'บางเขน',
        label: 'บางเขน',
        subDistricts: [
          { value: 'อนุสาวรีย์', label: 'อนุสาวรีย์', postalCode: '10220' },
          { value: 'ท่าแร้ง', label: 'ท่าแร้ง', postalCode: '10220' },
        ],
      },
      {
        value: 'ดินแดง',
        label: 'ดินแดง',
        subDistricts: [
          { value: 'ดินแดง', label: 'ดินแดง', postalCode: '10400' },
        ],
      },
      {
        value: 'ราชเทวี',
        label: 'ราชเทวี',
        subDistricts: [
          { value: 'ทุ่งพญาไท', label: 'ทุ่งพญาไท', postalCode: '10400' },
          { value: 'ถนนพญาไท', label: 'ถนนพญาไท', postalCode: '10400' },
          { value: 'ถนนเพชรบุรี', label: 'ถนนเพชรบุรี', postalCode: '10400' },
          { value: 'มักกะสัน', label: 'มักกะสัน', postalCode: '10400' },
        ],
      },
      {
        value: 'บางนา',
        label: 'บางนา',
        subDistricts: [
          { value: 'บางนา', label: 'บางนา', postalCode: '10260' },
        ],
      },
      {
        value: 'ประเวศ',
        label: 'ประเวศ',
        subDistricts: [
          { value: 'ประเวศ', label: 'ประเวศ', postalCode: '10250' },
          { value: 'หนองบอน', label: 'หนองบอน', postalCode: '10250' },
          { value: 'ดอกไม้', label: 'ดอกไม้', postalCode: '10250' },
        ],
      },
      {
        value: 'สวนหลวง',
        label: 'สวนหลวง',
        subDistricts: [
          { value: 'สวนหลวง', label: 'สวนหลวง', postalCode: '10250' },
        ],
      },
    ],
  },
  
  // ปริมณฑล
  {
    value: 'นนทบุรี',
    label: 'นนทบุรี',
    districts: [
      {
        value: 'เมืองนนทบุรี',
        label: 'เมืองนนทบุรี',
        subDistricts: [
          { value: 'สวนใหญ่', label: 'สวนใหญ่', postalCode: '11000' },
          { value: 'ตลาดขวัญ', label: 'ตลาดขวัญ', postalCode: '11000' },
          { value: 'บางเขน', label: 'บางเขน', postalCode: '11000' },
          { value: 'บางกระสอ', label: 'บางกระสอ', postalCode: '11000' },
        ],
      },
      {
        value: 'บางใหญ่',
        label: 'บางใหญ่',
        subDistricts: [
          { value: 'บางม่วง', label: 'บางม่วง', postalCode: '11140' },
          { value: 'บางแม่นาง', label: 'บางแม่นาง', postalCode: '11140' },
          { value: 'เสาธงหิน', label: 'เสาธงหิน', postalCode: '11140' },
        ],
      },
    ],
  },
  {
    value: 'ปทุมธานี',
    label: 'ปทุมธานี',
    districts: [
      {
        value: 'เมืองปทุมธานี',
        label: 'เมืองปทุมธานี',
        subDistricts: [
          { value: 'บางปรอก', label: 'บางปรอก', postalCode: '12000' },
          { value: 'บางเดื่อ', label: 'บางเดื่อ', postalCode: '12000' },
          { value: 'บางคูวัด', label: 'บางคูวัด', postalCode: '12000' },
        ],
      },
      {
        value: 'คลองหลวง',
        label: 'คลองหลวง',
        subDistricts: [
          { value: 'คลองหนึ่ง', label: 'คลองหนึ่ง', postalCode: '12120' },
          { value: 'คลองสอง', label: 'คลองสอง', postalCode: '12120' },
          { value: 'คลองสาม', label: 'คลองสาม', postalCode: '12120' },
        ],
      },
    ],
  },
  {
    value: 'สมุทรปราการ',
    label: 'สมุทรปราการ',
    districts: [
      {
        value: 'เมืองสมุทรปราการ',
        label: 'เมืองสมุทรปราการ',
        subDistricts: [
          { value: 'ปากน้ำ', label: 'ปากน้ำ', postalCode: '10270' },
          { value: 'สำโรงเหนือ', label: 'สำโรงเหนือ', postalCode: '10270' },
          { value: 'แพรกษา', label: 'แพรกษา', postalCode: '10280' },
        ],
      },
      {
        value: 'บางพลี',
        label: 'บางพลี',
        subDistricts: [
          { value: 'บางพลีใหญ่', label: 'บางพลีใหญ่', postalCode: '10540' },
          { value: 'บางแก้ว', label: 'บางแก้ว', postalCode: '10540' },
          { value: 'ราชาเทวะ', label: 'ราชาเทวะ', postalCode: '10540' },
        ],
      },
    ],
  },
  
  // ภาคเหนือ
  {
    value: 'เชียงใหม่',
    label: 'เชียงใหม่',
    districts: [
      {
        value: 'เมืองเชียงใหม่',
        label: 'เมืองเชียงใหม่',
        subDistricts: [
          { value: 'ศรีภูมิ', label: 'ศรีภูมิ', postalCode: '50200' },
          { value: 'พระสิงห์', label: 'พระสิงห์', postalCode: '50200' },
          { value: 'หายยา', label: 'หายยา', postalCode: '50100' },
          { value: 'ช้างม่อย', label: 'ช้างม่อย', postalCode: '50300' },
          { value: 'ช้างคลาน', label: 'ช้างคลาน', postalCode: '50100' },
          { value: 'วัดเกต', label: 'วัดเกต', postalCode: '50000' },
          { value: 'ช้างเผือก', label: 'ช้างเผือก', postalCode: '50300' },
        ],
      },
      {
        value: 'สันทราย',
        label: 'สันทราย',
        subDistricts: [
          { value: 'สันทรายหลวง', label: 'สันทรายหลวง', postalCode: '50210' },
          { value: 'สันทรายน้อย', label: 'สันทรายน้อย', postalCode: '50210' },
          { value: 'สันพระเนตร', label: 'สันพระเนตร', postalCode: '50210' },
          { value: 'หนองจ๊อม', label: 'หนองจ๊อม', postalCode: '50210' },
        ],
      },
      {
        value: 'หางดง',
        label: 'หางดง',
        subDistricts: [
          { value: 'หางดง', label: 'หางดง', postalCode: '50230' },
          { value: 'หนองแก๋ว', label: 'หนองแก๋ว', postalCode: '50230' },
          { value: 'บ้านแหวน', label: 'บ้านแหวน', postalCode: '50230' },
        ],
      },
    ],
  },
  {
    value: 'เชียงราย',
    label: 'เชียงราย',
    districts: [
      {
        value: 'เมืองเชียงราย',
        label: 'เมืองเชียงราย',
        subDistricts: [
          { value: 'เวียง', label: 'เวียง', postalCode: '57000' },
          { value: 'รอบเวียง', label: 'รอบเวียง', postalCode: '57000' },
          { value: 'บ้านดู่', label: 'บ้านดู่', postalCode: '57100' },
          { value: 'นางแล', label: 'นางแล', postalCode: '57100' },
        ],
      },
      {
        value: 'แม่จัน',
        label: 'แม่จัน',
        subDistricts: [
          { value: 'แม่จัน', label: 'แม่จัน', postalCode: '57110' },
          { value: 'จันจว้า', label: 'จันจว้า', postalCode: '57110' },
        ],
      },
    ],
  },
  
  // ภาคตะวันออกเฉียงเหนือ
  {
    value: 'นครราชสีมา',
    label: 'นครราชสีมา',
    districts: [
      {
        value: 'เมืองนครราชสีมา',
        label: 'เมืองนครราชสีมา',
        subDistricts: [
          { value: 'ในเมือง', label: 'ในเมือง', postalCode: '30000' },
          { value: 'โพธิ์กลาง', label: 'โพธิ์กลาง', postalCode: '30000' },
          { value: 'หนองไผ่ล้อม', label: 'หนองไผ่ล้อม', postalCode: '30000' },
          { value: 'ตลาด', label: 'ตลาด', postalCode: '30310' },
        ],
      },
      {
        value: 'ปากช่อง',
        label: 'ปากช่อง',
        subDistricts: [
          { value: 'ปากช่อง', label: 'ปากช่อง', postalCode: '30130' },
          { value: 'กลางดง', label: 'กลางดง', postalCode: '30320' },
          { value: 'หมูสี', label: 'หมูสี', postalCode: '30130' },
        ],
      },
    ],
  },
  {
    value: 'ขอนแก่น',
    label: 'ขอนแก่น',
    districts: [
      {
        value: 'เมืองขอนแก่น',
        label: 'เมืองขอนแก่น',
        subDistricts: [
          { value: 'ในเมือง', label: 'ในเมือง', postalCode: '40000' },
          { value: 'สำราญ', label: 'สำราญ', postalCode: '40000' },
          { value: 'บ้านค้อ', label: 'บ้านค้อ', postalCode: '40000' },
          { value: 'บ้านหว้า', label: 'บ้านหว้า', postalCode: '40000' },
          { value: 'บ้านเป็ด', label: 'บ้านเป็ด', postalCode: '40000' },
        ],
      },
      {
        value: 'บ้านไผ่',
        label: 'บ้านไผ่',
        subDistricts: [
          { value: 'บ้านไผ่', label: 'บ้านไผ่', postalCode: '40110' },
          { value: 'ในเมือง', label: 'ในเมือง', postalCode: '40110' },
        ],
      },
    ],
  },
  {
    value: 'อุดรธานี',
    label: 'อุดรธานี',
    districts: [
      {
        value: 'เมืองอุดรธานี',
        label: 'เมืองอุดรธานี',
        subDistricts: [
          { value: 'หมากแข้ง', label: 'หมากแข้ง', postalCode: '41000' },
          { value: 'บ้านเลื่อม', label: 'บ้านเลื่อม', postalCode: '41000' },
          { value: 'หนองบัว', label: 'หนองบัว', postalCode: '41000' },
        ],
      },
    ],
  },
  {
    value: 'อุบลราชธานี',
    label: 'อุบลราชธานี',
    districts: [
      {
        value: 'เมืองอุบลราชธานี',
        label: 'เมืองอุบลราชธานี',
        subDistricts: [
          { value: 'ในเมือง', label: 'ในเมือง', postalCode: '34000' },
          { value: 'หนองขอน', label: 'หนองขอน', postalCode: '34000' },
          { value: 'ปทุม', label: 'ปทุม', postalCode: '34000' },
        ],
      },
    ],
  },
  
  // ภาคกลาง
  {
    value: 'นครปฐม',
    label: 'นครปฐม',
    districts: [
      {
        value: 'เมืองนครปฐม',
        label: 'เมืองนครปฐม',
        subDistricts: [
          { value: 'พระปฐมเจดีย์', label: 'พระปฐมเจดีย์', postalCode: '73000' },
          { value: 'บางแขม', label: 'บางแขม', postalCode: '73000' },
          { value: 'ธรรมศาลา', label: 'ธรรมศาลา', postalCode: '73000' },
        ],
      },
    ],
  },
  {
    value: 'พระนครศรีอยุธยา',
    label: 'พระนครศรีอยุธยา',
    districts: [
      {
        value: 'พระนครศรีอยุธยา',
        label: 'พระนครศรีอยุธยา',
        subDistricts: [
          { value: 'ประตูชัย', label: 'ประตูชัย', postalCode: '13000' },
          { value: 'หอรัตนไชย', label: 'หอรัตนไชย', postalCode: '13000' },
          { value: 'หัวรอ', label: 'หัวรอ', postalCode: '13000' },
        ],
      },
    ],
  },
  
  // ภาคตะวันออก
  {
    value: 'ชลบุรี',
    label: 'ชลบุรี',
    districts: [
      {
        value: 'เมืองชลบุรี',
        label: 'เมืองชลบุรี',
        subDistricts: [
          { value: 'บางปลาสร้อย', label: 'บางปลาสร้อย', postalCode: '20000' },
          { value: 'มะขามหย่ง', label: 'มะขามหย่ง', postalCode: '20000' },
          { value: 'บ้านสวน', label: 'บ้านสวน', postalCode: '20000' },
          { value: 'แสนสุข', label: 'แสนสุข', postalCode: '20130' },
        ],
      },
      {
        value: 'บางละมุง',
        label: 'บางละมุง',
        subDistricts: [
          { value: 'บางละมุง', label: 'บางละมุง', postalCode: '20150' },
          { value: 'หนองปรือ', label: 'หนองปรือ', postalCode: '20150' },
          { value: 'นาเกลือ', label: 'นาเกลือ', postalCode: '20150' },
          { value: 'หนองปลาไหล', label: 'หนองปลาไหล', postalCode: '20150' },
        ],
      },
      {
        value: 'ศรีราชา',
        label: 'ศรีราชา',
        subDistricts: [
          { value: 'ศรีราชา', label: 'ศรีราชา', postalCode: '20110' },
          { value: 'สุรศักดิ์', label: 'สุรศักดิ์', postalCode: '20110' },
          { value: 'ทุ่งสุขลา', label: 'ทุ่งสุขลา', postalCode: '20230' },
        ],
      },
    ],
  },
  {
    value: 'ระยอง',
    label: 'ระยอง',
    districts: [
      {
        value: 'เมืองระยอง',
        label: 'เมืองระยอง',
        subDistricts: [
          { value: 'ท่าประดู่', label: 'ท่าประดู่', postalCode: '21000' },
          { value: 'ปากน้ำ', label: 'ปากน้ำ', postalCode: '21000' },
          { value: 'เนินพระ', label: 'เนินพระ', postalCode: '21000' },
        ],
      },
    ],
  },
  
  // ภาคใต้
  {
    value: 'สุราษฎร์ธานี',
    label: 'สุราษฎร์ธานี',
    districts: [
      {
        value: 'เมืองสุราษฎร์ธานี',
        label: 'เมืองสุราษฎร์ธานี',
        subDistricts: [
          { value: 'ตลาด', label: 'ตลาด', postalCode: '84000' },
          { value: 'มะขามเตี้ย', label: 'มะขามเตี้ย', postalCode: '84000' },
          { value: 'วัดประดู่', label: 'วัดประดู่', postalCode: '84000' },
        ],
      },
      {
        value: 'เกาะสมุย',
        label: 'เกาะสมุย',
        subDistricts: [
          { value: 'อ่างทอง', label: 'อ่างทอง', postalCode: '84140' },
          { value: 'ลิปะน้อย', label: 'ลิปะน้อย', postalCode: '84140' },
          { value: 'บ่อผุด', label: 'บ่อผุด', postalCode: '84320' },
        ],
      },
    ],
  },
  {
    value: 'สงขลา',
    label: 'สงขลา',
    districts: [
      {
        value: 'เมืองสงขลา',
        label: 'เมืองสงขลา',
        subDistricts: [
          { value: 'บ่อยาง', label: 'บ่อยาง', postalCode: '90000' },
          { value: 'เขารูปช้าง', label: 'เขารูปช้าง', postalCode: '90000' },
          { value: 'พะวง', label: 'พะวง', postalCode: '90100' },
        ],
      },
      {
        value: 'หาดใหญ่',
        label: 'หาดใหญ่',
        subDistricts: [
          { value: 'หาดใหญ่', label: 'หาดใหญ่', postalCode: '90110' },
          { value: 'คูเต่า', label: 'คูเต่า', postalCode: '90110' },
          { value: 'คลองแห', label: 'คลองแห', postalCode: '90110' },
        ],
      },
    ],
  },
  {
    value: 'ภูเก็ต',
    label: 'ภูเก็ต',
    districts: [
      {
        value: 'เมืองภูเก็ต',
        label: 'เมืองภูเก็ต',
        subDistricts: [
          { value: 'ตลาดใหญ่', label: 'ตลาดใหญ่', postalCode: '83000' },
          { value: 'ตลาดเหนือ', label: 'ตลาดเหนือ', postalCode: '83000' },
          { value: 'รัษฎา', label: 'รัษฎา', postalCode: '83000' },
          { value: 'วิชิต', label: 'วิชิต', postalCode: '83000' },
        ],
      },
      {
        value: 'กะทู้',
        label: 'กะทู้',
        subDistricts: [
          { value: 'กะทู้', label: 'กะทู้', postalCode: '83120' },
          { value: 'ป่าตอง', label: 'ป่าตอง', postalCode: '83150' },
          { value: 'กมลา', label: 'กมลา', postalCode: '83150' },
        ],
      },
    ],
  },
];

// Helper functions
export const getProvinces = (): Province[] => {
  return thailandAddressData;
};

export const getDistrictsByProvince = (provinceValue: string): District[] => {
  const province = thailandAddressData.find(p => p.value === provinceValue);
  return province?.districts || [];
};

export const getSubDistrictsByDistrict = (provinceValue: string, districtValue: string): SubDistrict[] => {
  const province = thailandAddressData.find(p => p.value === provinceValue);
  const district = province?.districts.find(d => d.value === districtValue);
  return district?.subDistricts || [];
};

export const getPostalCodeBySubDistrict = (provinceValue: string, districtValue: string, subDistrictValue: string): string => {
  const subDistricts = getSubDistrictsByDistrict(provinceValue, districtValue);
  const subDistrict = subDistricts.find(sd => sd.value === subDistrictValue);
  return subDistrict?.postalCode || '';
};
