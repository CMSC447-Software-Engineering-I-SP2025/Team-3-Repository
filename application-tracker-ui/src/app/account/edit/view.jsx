'use client'
import PageContainer from "@/components/PageContainer"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as Yup from 'yup'
import ContentContainer from "@/components/ContentContainer"
import { TextField, Grid2, Box, Typography, Divider, Tooltip, Button, Chip, Collapse, Alert, AlertTitle } from "@mui/material"
import { HelpOutline } from "@mui/icons-material"
import Form from "@/components/Form"
import Input from "@/components/Input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { getBrowserToken } from "@/utils/browserUtils"
import { HeaderValues } from "@/constants"

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  username: Yup.string().required('Required'),
  email: Yup.string().required('Required'),
  skills: Yup.array(),
})

const COMMON_GRID_PROPS = { size: { xs: 12, md: 6 } }

const BasicInput = ({ component = null, ...props }) =>
  <Grid2 {...COMMON_GRID_PROPS}>
    {
      component ? component : <Input fullWidth {...props} />
    }
  </Grid2>

const SkillSection = ({ skills, setSkills, setNewSkill, newSkill }) => {
  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setSkills(skills.filter((skill) => skill !== skillToDelete));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddSkill();
    }
  };
  return <Grid2 container spacing={1}>
    <Grid2 xs={3}>
      <Typography 
        variant="body2" 
        sx={{ fontWeight: 500, color: '#555', mt: 0.5 }}
      >
        Skills:
      </Typography>
    </Grid2>
    <Grid2 xs={9}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
        {skills.map((skill, index) => (
          <Chip
            key={index}
            label={skill}
            onDelete={() => handleDeleteSkill(skill)}
            size="small"
            sx={{
              backgroundColor: '#e0f2fe',
              color: '#0d47a1',
              fontSize: '0.75rem',
              height: 24,
              '& .MuiChip-label': {
                padding: '0 8px'
              }
            }}
          />
        ))}
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          variant="outlined"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a skill"
          size="small"
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: 1,
              height: 32,
              '& input': {
                padding: '0 8px',
                fontSize: '0.875rem'
              }
            }
          }}
        />
        <Button
          variant="contained"
          onClick={handleAddSkill}
          size="small"
          sx={{
            height: 32,
            minWidth: 80,
            backgroundColor: '#0d47a1',
            '&:hover': { backgroundColor: '#1565c0' },
            fontSize: '0.875rem',
            textTransform: 'none'
          }}
        >
          Add
        </Button>
      </Box>
    </Grid2>
  </Grid2>
}


const UserEditView = ({ user = {}, handleUpdate = async() => {} }) => {
  const [skills, setSkills] = useState(user.skills);
  const [newSkill, setNewSkill] = useState('');
  const [errors, setErrors] = useState([])
  const router = useRouter()
  
  const form = useForm({
    defaultValues: user,
    resolver: yupResolver(validationSchema)
  })

  const submitFunction = async data => {
    const newValues = { ...data, skills, id: user.id }
    const token = getBrowserToken()
    const headers = { [HeaderValues.TOKEN]: token }
    const { data: newData, status, error } = await handleUpdate(newValues, headers)

    if (status !== 200) {
      setErrors([error])
      return
    }

    router.push('/account')
  }

  return <PageContainer >
    <ContentContainer sx={{ maxWidth: 800 }} >
      <Grid2 size={12}>
        <Collapse in={errors.length > 0}>
          <Alert severity='error'>
            <AlertTitle>
              <Typography>Failed to Update Profile.</Typography>
            </AlertTitle>
            { errors.map((item, index) => <Typography key={index} >Error: {item}</Typography>) }
          </Alert>
        </Collapse>
      </Grid2>
      <Grid2 size={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >
          <Typography fontSize='1.5rem' fontWeight='bold' >
            Edit Account
          </Typography>
        </Box>
        <Divider/>
      </Grid2>
      <Form methods={form} onSubmit={form.handleSubmit(submitFunction)}>
        <Grid2 container spacing={1} sx={{ mb: 2 }} >
          <Grid2 size={12} >
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: 'bold',
                fontSize: '1.15rem'
              }}
            >
              The Following Fields Cannot be Modified
              <Tooltip
                arrow
                sx={{ ml: 1 }}
                title='These fields are read-only because of their importance. Please contact us if you would like to change these values.'
              >
                <HelpOutline/>
              </Tooltip>
            </Typography>
          </Grid2>
          <BasicInput disabled name='email' label='Email' />
          <BasicInput disabled name='username' label='Username' />
          
        </Grid2>
        <Grid2 size={12} sx={{ mb: 2 }} > <Divider/> </Grid2>

        <Grid2 container spacing={1}>
          <Grid2 size={12}>
            <Typography fontSize='1.15rem' fontWeight='bold'>
              Editable Fields
            </Typography>
          </Grid2>
          <BasicInput name='firstName' label='First Name' />
          <BasicInput name='lastName' label='Last Name' />
          <SkillSection
            skills={skills}
            setSkills={setSkills}
            setNewSkill={setNewSkill}
            newSkill={newSkill}
          />
          <Grid2 size={12}>
            <Button
              fullWidth
              type='submit'
              variant='contained'
              sx={{ backgroundColor: 'lightPurple' }}
            >
              Update
            </Button>
          </Grid2>
        </Grid2>
      </Form>
    </ContentContainer>
  </PageContainer>
}

export default UserEditView