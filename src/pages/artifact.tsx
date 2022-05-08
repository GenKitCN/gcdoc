import {useCallback, useEffect, useState} from "react";
import ReliquaryDataProvider, {IReliquary, IReliquaryAffixItem, IReliquaryAffix, IReliquaryMain} from "../components/providers/Artifacts";
import {
    Autocomplete,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    Input,
    TextField,
    Paper,
    ListSubheader, List, ListItemButton
} from "@mui/material";
//@ts-ignore
import _ from "lodash";
import * as React from "react";
import Layout from "@theme/Layout";

interface IOption {
    id: number;
    name: string;
}

interface IAffixOpt {
    id: number;
    name: string;
    index: number;
    value: number;
    displayValue: string | number;
}

export default function Artifacts() {
    const [reliquaries, setReliquary] = useState<IReliquary[]>([]);
    const [reliquaryMains, setReliquaryMains] = useState<IReliquaryMain[]>([]);
    const [reliquaryAffixes, setReliquaryAffixes] = useState<IReliquaryAffix>({});
    const [uid, setUid] = useState(10001);
    const [selectedArtifact, setSelectedArtifact] = useState(0);
    const [selectedMainStat, setSelectedMainStat] = useState(0);
    const [selectedAffixes, setSelectedAffixes] = useState<number[]>([]);
    const [selectedAffixesAmount, setSelectedAffixesAmount] = useState<Record<number, number>>({});
    const [artifactEnhancements, setArtifactEnhancements] = useState<number>(0);

    const [artifactData, setArtifactData] = useState<IOption[]>([]);
    const [artifactMains, setArtifactMains] = useState<IOption[]>([]);
    const [artifactAffixes, setArtifactAffixes] = useState<{[key:string]:IAffixOpt[]}>({});
    const [generatedArtifact, setGeneratedArtifact] = useState("/giveart ");

    const [TextMap, setTextMap] = useState({});
    const affix2text = {
        "FIGHT_PROP_HP": 2404061249,
        "FIGHT_PROP_ATTACK": 1756301290,
        "FIGHT_PROP_DEFENSE": 1575853882,
        "FIGHT_PROP_SUB_HURT": 3892469682,
        "FIGHT_PROP_HEAL_ADD": 3911103831,
        "FIGHT_PROP_CRITICAL": 1916797986,
        "FIGHT_PROP_ADD_HURT": 2920451417,
        "FIGHT_PROP_HP_PERCENT": 2756497090,
        "FIGHT_PROP_HEALED_ADD": 3392845215,
        "FIGHT_PROP_ICE_SUB_HURT": 2221516638,
        "FIGHT_PROP_ICE_ADD_HURT": 4054347456,
        "FIGHT_PROP_WIND_ADD_HURT": 312842903,
        "FIGHT_PROP_ROCK_SUB_HURT": 3363551926,
        "FIGHT_PROP_ELEC_SUB_HURT": 1580778495,
        "FIGHT_PROP_CRITICAL_HURT": 4137936461,
        "FIGHT_PROP_SPEED_PERCENT": 3552803520,
        "FIGHT_PROP_WIND_SUB_HURT": 675300986,
        "FIGHT_PROP_ROCK_ADD_HURT": 2557985416,
        "FIGHT_PROP_ELEC_ADD_HURT": 3514877774,
        "FIGHT_PROP_FIRE_SUB_HURT": 570007818,
        "FIGHT_PROP_FIRE_ADD_HURT": 999734248,
        "FIGHT_PROP_ATTACK_PERCENT": 2796372974,
        "FIGHT_PROP_GRASS_SUB_HURT": 2809766539,
        "FIGHT_PROP_GRASS_ADD_HURT": 1824382851,
        "FIGHT_PROP_WATER_ADD_HURT": 3619239513,
        "FIGHT_PROP_WATER_SUB_HURT": 1406081734,
        "FIGHT_PROP_DEFENSE_PERCENT": 3076885710,
        "FIGHT_PROP_ELEMENT_MASTERY": 2326066533,
        "FIGHT_PROP_PHYSICAL_ADD_HURT": 3763864883,
        "FIGHT_PROP_PHYSICAL_SUB_HURT": 2073208032,
        "FIGHT_PROP_CHARGE_EFFICIENCY": 1735465728,
        "FIGHT_PROP_SKILL_CD_MINUS_RATIO": 1083556685,
        "FIGHT_PROP_SHIELD_COST_MINUS_RATIO": 195785769
    }

    useEffect(() => {
        const dataArtifact: IOption[] = [];
        const dataMainAttrs: IOption[] = [];
        const dataAffixes: {[key:string]:IAffixOpt[]} = {}
        const initReliquaryData = async () => {
            await ReliquaryDataProvider.init();
            setReliquary(ReliquaryDataProvider.getReliquary());
            setReliquaryMains(ReliquaryDataProvider.getReliquaryMains());
            setReliquaryAffixes(ReliquaryDataProvider.getReliquaryAffixes());
        };
        initReliquaryData();
        fetch("https://raw.githubusercontent.com/Dimbreath/GenshinData/master/TextMap/TextMapCHS.json")
            .then(resp => resp.json())
            .then(textMap => {
                let ReliquaryAffixes = ReliquaryDataProvider.getReliquaryAffixes();
                ReliquaryDataProvider.getReliquary().forEach(reliquary => {
                    const id = reliquary.id;
                    const name = textMap[reliquary.nameTextMapHash];
                    if (dataArtifact.filter((x) => x.name === name).length === 0) {
                        dataArtifact.push({id: id, name: name});
                    }
                });
                ReliquaryDataProvider.getReliquaryMains().forEach(mainAttr => {
                    const id = mainAttr.id;
                    const name = textMap[affix2text[mainAttr.propType]];
                    dataMainAttrs.push({id: id, name: name});
                });
                Object.keys(ReliquaryAffixes).map((key, index) => {
                    ReliquaryAffixes[key].map((affix, rIndex) => {
                        const id = affix.id;
                        const name = textMap[affix2text[affix.propType]];
                        const index = affix.index;
                        const value = affix.propValue;
                        const displayValue = getPercent(affix);
                        if (Object.keys(dataAffixes).indexOf(name) == -1) {
                            dataAffixes[name] = [];
                        }
                        dataAffixes[name].push({id: id, name: name, index: index, value: value, displayValue: displayValue})
                    });
                });
                setArtifactData(dataArtifact);
                setArtifactMains(dataMainAttrs);
                setArtifactAffixes(dataAffixes);
            });
    }, []);

    useEffect(() => {
        handleGeneratedArtifact()
    }, [uid, selectedArtifact, selectedMainStat, selectedAffixes, selectedAffixesAmount, artifactEnhancements]);

    const handleArtifactChange = (event: any, value: any) => {
        if (value !== null) {
            setSelectedArtifact(value.id);
        }
    };

    const handleMainStatChange = (event: any, value: any) => {
        if (value !== null) {
            setSelectedMainStat(value.id);
        }
    };

    const handleAffixSelected = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, amount = false, affixId = 0) => {
        let newSelectedAffixes = [...selectedAffixes];
        let newSelectedAffixesAmount = {...selectedAffixesAmount};
        if (amount) {
            newSelectedAffixesAmount[affixId] = Number(event.target.value);
        } else {
            if (newSelectedAffixes.indexOf(Number(event.currentTarget.value)) === -1) {
                newSelectedAffixes.push(Number(event.currentTarget.value));
                newSelectedAffixesAmount[Number(event.currentTarget.value)] = 1;
            } else {
                newSelectedAffixes.splice(newSelectedAffixes.indexOf(Number(event.currentTarget.value)), 1);
                newSelectedAffixesAmount[Number(event.currentTarget.value)] = 0;
            }
        }
        setSelectedAffixes(newSelectedAffixes);
        setSelectedAffixesAmount(newSelectedAffixesAmount);
    };

    const getPercent = (affix: IReliquaryAffixItem) => {
        if (
            affix.propType.indexOf("PERCENT") !== -1 ||
            affix.propType.indexOf("CRITICAL") !== -1 ||
            affix.propType.indexOf("EFFICIENCY") !== -1 ||
            affix.propType.indexOf("EFFICIENCY") !== -1 ||
            affix.propType.indexOf("HURT") !== -1
        ) {
            return parseFloat(String(affix.propValue * 100)).toPrecision(3) + "%";
        }
        return parseInt(String(affix.propValue));
    };

    const handleGeneratedArtifact = () => {
        let selectedAffixesCombine: (string | number)[] = [];
        if (selectedAffixes.length > 0) {
            selectedAffixesCombine = selectedAffixes.map(x => {
                if (selectedAffixesAmount[x] > 1) {
                    return x + "," + selectedAffixesAmount[x];
                }
                return x;
            });
        }
        const generated = "/giveart @" + uid + " " + selectedArtifact + " " + selectedMainStat + " " + selectedAffixesCombine.join(" ") + " " + Number(artifactEnhancements + 1);
        setGeneratedArtifact(generated);
    };
    return (
        <Layout>
            <Container sx={{
                padding: {
                    xs: '5%',
                    sm: '10%'
                }
            }}>
                <Paper
                    sx={{
                        p: 2,
                        margin: 'auto',
                        maxWidth: 1000,
                        flexGrow: 1,
                        background: "rgb(240, 240, 240)"
                    }}
                >
                    <Grid container spacing={2} columns={{
                        xs: 1,
                        sm: 2
                    }}>
                        <Grid item container xs={12} sm={5}>
                            <Grid item container>
                                <Grid item xs={10}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="UID"
                                        defaultValue="10001"
                                        onChange={(event) => setUid(parseInt(event.target.value))}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Input
                                        value={artifactEnhancements}
                                        size="small"
                                        onChange={(e)=>setArtifactEnhancements(Number(e.currentTarget.value))}
                                        inputProps={{
                                            step: 1,
                                            min: 0,
                                            max: 20,
                                            type: 'number'
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Autocomplete
                                aria-label="Artifact Name" id="ArtifactName"
                                options={artifactData}
                                sx={{
                                    width: "inherit"
                                }}
                                getOptionLabel={(option) => option.name}
                                onChange={handleArtifactChange}
                                renderInput={(params) => <TextField {...params} label="圣遗物名" variant="outlined"/>}
                            />
                            <Autocomplete
                                aria-label="Artifact Main Stats" id="ArtifactMainStats"
                                options={artifactMains}
                                sx={{
                                    width: "inherit"
                                }}
                                getOptionLabel={(option) => option.name}
                                onChange={handleMainStatChange}
                                renderInput={(params) => <TextField {...params} label="主属性"
                                                                    variant="outlined"/>}
                            />
                        </Grid>
                        <Grid item container xs={12} sm={7}>
                            <List
                                sx={{
                                    width: 'inherit',
                                    bgcolor: 'background.paper',
                                    position: 'relative',
                                    overflow: 'auto',
                                    maxHeight: 300,
                                    '& ul': { padding: 0 },
                                }}
                                subheader={<li />}
                            >
                                {Object.keys(artifactAffixes).map((key, index) => (
                                    <li key={index}>
                                        <ul>
                                            <ListSubheader>{key}</ListSubheader>
                                            {
                                                artifactAffixes[key].map((affix, rIndex) => (
                                                        <ListItemButton key={affix.index}>
                                                            <FormControlLabel
                                                                control={<Checkbox
                                                                    value={affix.id}
                                                                    id={"select-"+affix.id}
                                                                    onChange={(e)=>handleAffixSelected(e,false,0)}
                                                                />}
                                                                label={`${affix.name} - ${affix.displayValue}`} />
                                                            <Input
                                                                value={Object.keys(selectedAffixesAmount).indexOf(String(affix.id)) != -1? selectedAffixesAmount[affix.id]:1}
                                                                size="small"
                                                                onChange={(e)=>handleAffixSelected(e,true, affix.id)}
                                                                inputProps={{
                                                                    step: 1,
                                                                    min: 1,
                                                                    max: 100,
                                                                    type: 'number',
                                                                    'aria-labelledby': 'input-slider',
                                                                }}
                                                            />
                                                        </ListItemButton>
                                                    )
                                                )
                                            }
                                        </ul>
                                    </li>
                                ))}
                            </List>
                        </Grid>
                        <TextField fullWidth label="命令 (20级的等级为21)" variant="standard" value={generatedArtifact}/>
                    </Grid>
                </Paper>
            </Container>
        </Layout>
    );
}