import { Observable, BehaviorSubject } from 'rxjs';
import { IPokemonDetail, IPokemonSpecies } from './../ipokemon-detail';
import { Component, Input, OnInit } from '@angular/core';
import { toSentenceCase } from 'utils';

@Component({
  selector: 'app-pokemon-profile',
  templateUrl: './pokemon-profile.component.html',
  styleUrls: ['./pokemon-profile.component.css'],
})
export class PokemonProfileComponent implements OnInit {
  @Input('pokemonDetails') detailsObs!: Observable<IPokemonDetail>;
  details!: IPokemonDetail;

  @Input('pokemonSpecies') speciesObs!: Observable<IPokemonSpecies>;
  species!: IPokemonSpecies;

  componentLoadedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  componentLoadedObs = this.componentLoadedSubject.asObservable();

  constructor() {}

  ngOnInit(): void {
    this.detailsObs.subscribe((val) => (this.details = val));
    this.speciesObs.subscribe((spec) => {
      this.species = spec;
      this.componentLoadedSubject.next(true);
    });
  }

  getProfileStats(): Map<string, any> {
    let det = this.details;
    let spec = this.species;

    return new Map([
      ['height', det.height / 10 + ' m'],
      ['hatch steps', (255 * (spec.hatch_counter + 1)).toString()],
      ['gender ratio', this._getGenderRateString()],
      ['weight', det.weight / 10 + ' kg'],
      [
        'abilities',
        det.abilities.map((x) => toSentenceCase(x.ability.name)).join(', '),
      ],
      [
        'egg group',
        spec.egg_groups.map((x) => toSentenceCase(x.name)).join(', '),
      ],
      ['catch rate', spec.capture_rate.toString() + '%'],
    ]);
  }

  private _getGenderRateString() {
    // Gender rate is measured in eights for some reason
    let femaleRate = (1 / (8 / this.species.gender_rate)) * 100;
    return `${100 - femaleRate}% ♂ ${femaleRate}% ♀`;
  }
}
