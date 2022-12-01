import './shims';
import Adapter from '@probot/adapter-github-actions';
import app from './app';

Adapter.run(app);
