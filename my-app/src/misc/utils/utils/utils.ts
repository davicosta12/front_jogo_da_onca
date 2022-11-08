import moment from "moment";

export const toastError = (err: any, msg?: string) => {
  console.error(err);
  let message = (typeof err === 'string' ? err : msg) || err?.data?.title || err?.data?.erroMessage || err?.data?.message || err?.message || 'Ocorreu um erro';
  if (err?.status === 401 && !err?.data?.erroMessage) message = "Acesso não permitido";
  if (err?.status === 502) message = "Serviço temporariamente indisponível";
  return message;
}

export const toastOptions = (toast: any) => {
  return Object.assign({
    position: toast.POSITION.TOP_RIGHT,
  });
}

export const formatDateTime = (date: string) => {
  const dateMoment = moment(date);
  return dateMoment.isValid() ? dateMoment.format("DD/MM/YYYY - HH:mm:ss") : "";
}

export const boardImagesOptions = [
  {
    key: 'boardImage01',
    text: 'Imagem Tabuleiro 01',
    value: '/images/avatar/small/jenny.jpg',
    image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
  },
  {
    key: 'boardImage02',
    text: 'Imagem Tabuleiro 02',
    value: '/images/avatar/small/elliot.jpg',
    image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
  },
  {
    key: 'boardImage03',
    text: 'Stevie Feliciano',
    value: '/images/avatar/small/stevie.jpg',
    image: { avatar: true, src: '/images/avatar/small/stevie.jpg' },
  }
]

export const skinDogImagesOptions = [
  {
    key: 'skinDog01',
    text: 'Skin Dog 01',
    value: '/images/avatar/small/jenny.jpg',
    image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
  },
  {
    key: 'skinDog02',
    text: 'Skin Dog 02',
    value: '/images/avatar/small/elliot.jpg',
    image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
  },
  {
    key: 'skinDog03',
    text: 'Skin Dog 03',
    value: '/images/avatar/small/stevie.jpg',
    image: { avatar: true, src: '/images/avatar/small/stevie.jpg' },
  }
]

export const skinJaguarImagesOptions = [
  {
    key: 'jaguarImage01',
    text: 'Skin Jaguar 01',
    value: '/images/avatar/small/jenny.jpg',
    image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
  },
  {
    key: 'jaguarImage02',
    text: 'Skin Jaguar 02',
    value: '/images/avatar/small/elliot.jpg',
    image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
  },
  {
    key: 'jaguarImage03',
    text: 'Skin Jaguar 03',
    value: '/images/avatar/small/stevie.jpg',
    image: { avatar: true, src: '/images/avatar/small/stevie.jpg' },
  }
]

export const userIconsOptions = [
  {
    key: 'userIcon01',
    text: 'Ícone Usuário 01',
    value: '/images/avatar/small/jenny.jpg',
    image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
  },
  {
    key: 'userIcon02',
    text: 'Ícone Usuário 02',
    value: '/images/avatar/small/elliot.jpg',
    image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
  },
  {
    key: 'userIcon03',
    text: 'Ícone Usuário 03',
    value: '/images/avatar/small/stevie.jpg',
    image: { avatar: true, src: '/images/avatar/small/stevie.jpg' },
  }
]