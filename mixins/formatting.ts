import { Component, Vue } from 'nuxt-property-decorator'
@Component
class Formatting extends Vue {
    public capitalizeFLetter(str: string) {
        return str[0].toUpperCase() + str.slice(1).toLowerCase()
    }

    public formatTimeStr(mins: number) {
      let timeStr = ''
      if (mins >= 60) {
        timeStr += Math.round(mins / 60) + 'h'
        if (mins % 60 != 0)
          timeStr += ' ' + mins % 60 + ' mins'
      } else if (mins > 0)
        timeStr += mins % 60 + ' mins'
      return timeStr
    }

    public formatSkillStr(skills: string) {
      if (!skills)
        return ''
      let format = ' | '
      skills.split(';').forEach((i, idx, array) => {
        if (idx == 0)
          format += this.capitalizeFLetter(i) + ', '
        else if (idx != array.length - 1)
          format += i.toLowerCase() + ', '
        else
          format += i.toLowerCase()
      });
      return format
    }

    public formatSearch(search: string) {
      switch (search) {
        case 'title':
          return 'Titres';
        case 'style':
          return 'Styles';
        case 'resume':
          return 'Résumé';
        case 'description':
          return 'Description';
        case 'skills':
          return 'Techniques';
        case 'duration':
          return 'Durée';
        default:
          return null;
      }
    }
}
export default Formatting