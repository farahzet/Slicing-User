import DashboardIcon from '../assets/images/DashboardIcon.png'
import DashboardIconWh from '../assets/images/DashboardIconWh.png'
import HitungIcon from '../assets/images/HitungIcon.svg'
import HitungIconWh from '../assets/images/HitungIconWh.svg'
import RiwayatIcon from '../assets/images/RiwayatIcon.svg'
import RiwayatIconWh from '../assets/images/RiwayatIconWh.png'
import ProfilIcon from '../assets/images/ProfilIcon.svg'
import ProfilIconWh from '../assets/images/ProfilIconWh.png'

export const navTitle = [
    {
        route: '',
        title: 'Dashboard',
    },
    {
        route: 'calories',
        title: 'Hitung Makanan',
    },
    {
        route: 'riwayatHitung',
        title: 'Riwayat Perhitungan',
    },
    // {
    //   route: 'users',
    //   title: 'Kelola User',
    // },
  ]

export const sides = [
  {
    icon: DashboardIcon,
    icon2: DashboardIconWh,
    label: 'Dashboard',
    link: '/'
  },
  {
    icon: HitungIcon,
    icon2: HitungIconWh,
    label: 'Perhitungan',
    link: '/calories'
  },
  {
    icon: RiwayatIcon,
    icon2: RiwayatIconWh,
    label: 'Riwayat Perhitungan',
    link: '/riwayatHitung'
  },
  // {
  //   icon: ProfilIcon,
  //   icon2: ProfilIconWh,
  //   label: 'Kelola User',
  //   link: '/users'
  // },
]


export const toppings = [
  {
    name: "Capsicum",
    price: 1.2
  },
  {
    name: "Paneer",
    price: 2.0
  },
  {
    name: "Red Paprika",
    price: 2.5
  },
  {
    name: "Onions",
    price: 3.0
  },
  {
    name: "Extra Cheese",
    price: 3.5
  },
  {
    name: "Baby Corns",
    price: 3.0
  },
  {
    name: "Mushroom",
    price: 2.0
  }
];

export const theadRiwayat = ["ID", "Tanggal", "Berat Badan","Tinggi Badan", "Total Kalori"];
export const theadAlternatif = ["ID", "Tanggal", "Alternatif","Makanan", "Total Kalori"];
export const theadPilihanMakanan = ["ID" , "Alternatif Makanan", "Total Kalori" ]
export const theadPilihanAlternatif = ["ID" , "Alternatif Makanan", "Deskripsi", "Peringkat" ]