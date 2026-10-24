// Duplicá este archivo para cada integrante y completá sus campos.
// Las imágenes se guardan en public/img y se referencian como /img/nombre.jpg.
export const perfilBase = {
  nombre: '',
  avatar: '',
  ubicacion: '',
  edad: '',
  email: '',
  linkedin: '',
  github: '',
  portfolio: '',
  resumen: '',
  sobreMi: '',
  habilidades: [
    { titulo: '', imagen: '', subtitulo: '', items: ['', ''] },
    { titulo: '', imagen: '', subtitulo: '', items: ['', ''] }
  ],
  // videoId: solo el identificador de un video de YouTube, no su URL.
  peliculas: [
    { titulo: '', videoId: '', descripcion: '' },
    { titulo: '', videoId: '', descripcion: '' }
  ],
  // spotifyId: solo el identificador del álbum, no su URL.
  discos: [
    { titulo: '', artista: '', spotifyId: '' },
    { titulo: '', artista: '', spotifyId: '' }
  ],
  juegos: [
    { titulo: '', imagen: '', genero: '', anio: '', descripcion: '' },
    { titulo: '', imagen: '', genero: '', anio: '', descripcion: '' }
  ]
}
