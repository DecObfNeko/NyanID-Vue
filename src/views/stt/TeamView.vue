<template>
  <div class="container mx-auto py-8">
    <div class="card w-full h-195  ">
      <h1 class="text-3xl font-semibold text-center mb-8 mt-10" style="color: azure;">关于我们</h1>
      <p></p>
      <p style="font-size: 35px;color: azure;" class="font-semibold text-center">由一群可爱的猫猫创建的工作室DecobfnekoDev</p>
      <p style="font-size: 35px;color: azure;" class="font-semibold text-center">MahiroHackerฅ(＞﹏＜) No Dimples#1337 here :(</p>
      <div class="card-body">
        <div class="grid lg:grid-cols-4 gap-4">
          <div v-for="developer in developers" :key="developer.id" class="card  shadow-x">
            <figure class="px-10">
              <img :src="developer.avatar" alt="Developer Avatar" class="rounded-xl object-cover" />
            </figure>
            <div class="card-body items-center text-center">
              <h2 class="card-title" :style="{color : developer.namecolor}">{{ developer.name }}</h2>
              <p class="text-x" :style="{color : developer.titlecolor}">{{ developer.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="TeamView">
import { ref } from 'vue';

const developers = ref([
  {
    id: 1,
    avatar: 'https://visage.surgeplay.com/face/64/96c6500f-4c9c-4fd2-86a5-e633862022be',
    name: 'MahiroONIMAI_',
    title: 'OWNER/Server',
    namecolor: 'pink',
    titlecolor: 'pink'
  },
  {
    id: 2,
    avatar: 'https://visage.surgeplay.com/face/64/a99bc286-ee62-44d8-ae1a-281a3bbe1d65',
    name: 'icelly_QAQ',
    title: 'ADMIN/Application',
    namecolor: 'skyblue',
    titlecolor: 'skyblue'
  },
  {
    id: 3,
    avatar: 'https://visage.surgeplay.com/face/64/2216fa32-ddb9-4e59-8df0-909e37e16342',
    name: 'Aiden_Hopkins',
    title: 'ADMIN/Application',
    namecolor: 'skyblue',
    titlecolor: 'skyblue'
  },
  {
    id: 4,
    avatar: 'https://visage.surgeplay.com/face/64/f766bf5b-7a4c-4397-aed9-5e60558ee05e',
    name: 'Tears_afb',
    title: 'Helper',
    namecolor: 'skyblue',
    titlecolor: 'skyblue'
  },
  {
    id: 5,
    avatar: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD/4gJASUNDX1BST0ZJTEUAAQEAAAIwAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAAFRtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAOAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/bAEMAAgEBAgEBAgICAgICAgIDBQMDAwMDBgQEAwUHBgcHBwYHBwgJCwkICAoIBwcKDQoKCwwMDAwHCQ4PDQwOCwwMDP/bAEMBAgICAwMDBgMDBgwIBwgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIAEAAQAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APuD9t22vvBP7PHjiaFZr60t9OkMF0kZWO4UE72z6Bc19pfsu6gup/s3fDy6t2Zobrw3p8qFGGDm3TjHpXiHjrw0Pij8O/FGiuzXS+I9JudKaGXAUebEyrjtkMR0qH/glR8XLf4ufsE2ui655No3gsXnhXWY5G+zi1jti8ILMSNoMS53ZGM5oFdbHqvx++Oug6p8M/FWjaD4j0m/8QRWz2tzaW10jTWyt8sjMAfl2KWJJ6AHNQfsa/tKfDv4vfAv4cSeEfFNhqFv4o0KW80KOYG0vNWtrN1t7i5jt5AsrRLIUzJtwRIhzhwT/IZ+0z8FW/Z8/af+MHg/w38UpNT0fwhq0sFpf6Dqbala6hpspYiVpYZfnCK8SShQ5DM2RhTit8Lv26fj1+zIt1qXgv4p31s1t4TTwjaavZ3q3E+l6Q9yswsbSSRTJZ5lXeVQRvhCegzRYZ/Tda/tK+E7z/gs140t/E2pQW8vw90az8Nafa3KFJYbq9SO7R0VudjoW2yrlScrnIIr678FfHjwv8SfAd54qsdWSDRdJvLmzu7q6/dxxPbyGOUZPoykZ9q/iR+H37YPxK+Gvxwt/iRY+MNavPGtv/zFdTuG1CeYYwBIZi3mAcEBsgFR6V9W/s9/8FxfjR4n8Ff8Kb8da5ouufDvxZr66jfyXVqljdWk0lyJ5HWeELlGfOY3BUg4BXqJle2gH9Dv7KP7U3w6vv21vi/eXPxA8MalB4zlsW0C+S/TaYoohHJAuejb8HGecV9jeLtBtPHPgvUtHvIkuLDWLOW0mVsMJEdSp56dCSK/HfQ/g/8AEb4wftEafo//AAiPg/Wvgpf6Us9xqKIDdXDyAMsVusRVo9hwoJJ4GTmvW/h38GfjN8L/ANovw78KvGHxm8d+F/h34ojZ/B7WjR/aAyjnTpZWQ9F3FM8kJ3rnp1nJ2sbSouKvc+grLVltBa6lDfQ6a0XzbJ3WGFGBzwzHHXvX4Cf8HIPx11Twx+2n4u8F+D/iFcJ4Q8YRWOv+I/CmjXDR6fBf/Z1QG4ZHKXEjqPNxgKglUY3bjXqP/Byj/wAE/NebXV+O3hW617V9BmjisvE+nPPJNFozIqxxXMaEkJC4Cq4UYV/m/jYj8xFttH8QXtg2j+H9GvNNupI4ZYPNuEvrJmIUh/3vzDJyJApU8ZCnK12JmNupwOgeILzwtq8N/p9xJa3duSUkT3BBBHQqQSCDkEEggg19i/shf8Et/F37YHw/0vxX4h8Q6V4L8B3UjtYRW0Ky3F5tYo7pEpVV5BG6Rt3H3SMV8ePpDX/iNrDTY5r55rnyLVI0LyXBLbUAA5LNxgDqTX11/wAE7f8Agqp8R/8Agm2vin4d6lL4gt/AniSb/ia6UsEa6l4fvo2AF7ZrcKVjnBQJJGwCyplW2sFdOPHU69SnyYefJLva+npdfqebmuHxleh7PBVlSk/tOPNZeSbSv5u/ofYWnf8ABFD4M/DP4cX+val4d+IPjKx0tVN1fyXMsdtCWIUF3gRI4kyeWdiFGTzij9sD/g0s+Imk/BmH4nfAjxR4d+I1pfWQ1d/CdgZRcW8LDeEsLqQkXwVcY3iGR8fKrEha+7P2E/8Ag4w8J/tSeBG+HviTw3cfEnXLiymtVttCsmS71i3WMhi+nkFlbby5RnUcsDgV9kf8Etv2f/Gnwy+COgyeIrjxB4RsNNvdWm0/wkZ4poTZ3cyPbLclkMm+3RNsao6BfMcMG+XHLl2X1MPeVarKpJ93ovRbI4siyOvgVKeKxM685buTtFf4YrRfi/kfl/8A8E4P+CtGsf8ABOL/AIJd2PxA8ZeDdW8XaRHDf+HrO3hiK3uj+IbOQxtY3ZYgwwupjmZiN0allCscCv0m8QeOdK/4KW/8E2tN8baHqnhu+8deH9N0/XryLw/qiXkHh3XEtILu5sRMpJDokpQqx3AOM8muQ/4L9/BjR7r/AIJw+OtG8LeH9Dt/FnjrVN1nFbww2zarq1yi2zTOeA8zRAKXY5KoMnipf2XPCXgf/ghp/wAE0fhz8Jde3a7451C1Z7rRtFQ3F/4j1e6O+58pANzRIzeUJCvEcSZxXpRiou6PoZSZ+ZX/AAcR/wDBSDxt4N+DupfCGx+E/izwVZeMLiS2v/F99LHLp2vWEc2VWzaLcoMu1S6yFZEXKFPm3V+JWi+I5dAjuDbRxrc3EZiW4OTJAhBDBOwLA4J64yBjJr+nj/gqP4B+MXxO/Z3+w/AvTfh/r2vfaHm1Kw8SxQytHF5e1Xs/tDC284NnImBBBGORz/PT8Y/2Evih8DvEuk3nxY0d/Amm+JtXeyfVrySK4ijk+/K/l27OxAUlhtGG6L0OKJLn/BK74XWfxn/4KQfBHw7qd5Z6fpd34x06a+nupBHEltDOs8wLMQBmONgM9SQK/oS/4LvfsE6J4Jfw38dvA8fhG01iPX4v7S0nWLOLUNP1+W6cQr5lvIGEiOXVJFQZVMuuHUGvlH/gg/8A8EZL79lTwu37QXxs8Anxr4O8aWE2j2elafC+oax4a0+YxuusS2luXdt4Ty3ihLTwJIX2kbwn39pGkfsd6P8AEu08UeF4fEXxR8WaSwn8P+ENJt9S1W6huVXAVbaTCQtnq900cadWZQMiZXa0Gt9T37/gmf4T+HOp/s/6L4w8H+AtC8D6jqQntdT0u10q3tZ9A1CCV7a8smMaKcxTxSxlujhQ3QivpB5MOc/MuOg6k+tfOP8AwS38YaX4s/Yo0vxba6ppt5deLNW1zxJrhti3laXqN3qdzcXdi+4Kwa0lka3YkDJhLdCK8f8AjJ+1R8Xv2w/FOv8Aw7+Bt5pLeHrGU2+v+OLJDGbGLOXhsmclJZ9uRuAYDnjNEY2Q5M6f/goh8RPDvxU+JngnwH4a8LL8TPix4f1QavpumrOf7N8OyhGVbzUGUgIoViVRiC2RivRv2Wf2G4/hl4pufH3xA1L/AITz4qaspa41e6X93pyMc+RaIf8AVxrwB/Fgck1N+wL8Evhr8CvhrcaR4HS9bV1lLa7d6uS+s3c/OZLgt83PJHRSOgxXvaTFGX+4I+rL8xNUSfkb/wAFhPE8ngz9iu8vPCrX0Nnqeu2lnqpgJjuLe1MiBtsn8Bb7uT618G/s8fso2P7bPwm+LnheT4A+N9c1zw9C48JFNUK3mq3MjbYAZJ5FhAQyCRpRjbCrnnof1E0n4Tf8Jn8DW8G/EAyeIrzUdMaLVbiNQivK4O4xqf7rk4OMjArx34D/ALYnij/gk/PBonxa0BvHPgu3l+z+G/EOlzw/2kkJ+VIZbRf3srovy5VTkCs6knze7sdFO3Ldnwf+xF/wX2+Ov/BHGz/4VH8WPh1q2q6V4ejb7PY36Pa3KIkzw+bE7gfuXkjYCT5lYgla/Xj9hP8A4LoXH7Tfwzm8U/E74JeN/gXosdurWWo63P5lr4hnOP3NgrxRSzsQQflTHzAAnnHZ6ZPcftfeKdW8V+B/gn4b02TxXYWMepeLfHWjB5NRitm861hFrIPNAhkPmLkbQ4DY3AGvWvhn+xHZweJ7PxZ8SNc1L4meMLFjJZT6s+6y0gt1W1tgBEvb5ypc4HNapmN+58w/CX9inxz+078d/iZ4skuPEHwn+BvxSv7LU77wWJBDca1dQW/kS3aooH2UXSJCZl4d2hViSSa+9Phv8J/D/wAIfCen6D4X0uy0PRtNjWOC2tYgqgAY5PVj6kkknvWz5bSAHbngAA1bXCDHpQ3ck8++JPwwK6ovibQbWJfE1nEYwM7Ir5CwykuPvY6g9Rgdq7LSXmn0qAXS+XchFMiDkIxHIB9qtzr5jDjIXkc0iJtH0BpAf//Z",
    name: '顾月辞_',
    title: 'Illustration',
    namecolor: 'skyblue',
    titlecolor: 'skyblue'
  }
]);
</script>